import {Box, Container, CssBaseline} from "@mui/material"
import axios from "axios"
import {useEffect, useState } from "react"
import NavBar from "./NavBar"
import ActivitiyDashboard from "../../features/activities/dashboard/ActivityDashboard"

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.find(activity => activity.id === id));
    }
    
    const handleCancelSelectActivity = () => {
        setSelectedActivity(undefined);
    }

    useEffect(() => {
            // Fetch activities from the API
            axios.get<Activity[]>('https://localhost:5001/api/activities')
                .then(response => setActivities(response.data))
                .catch(error => console.error('Error fetching activities:', error))
            // Cleanup function to avoid memory leaks
            return () => {}
        }, []
    )

    const handleOpenForm = (id?: string) => {
        if (id) handleSelectActivity(id);
        else handleCancelSelectActivity();
        setEditMode(true);
    }

    const handleFormClose = () => {
        setEditMode(false);
    }

    const handleSubmitForm = (activity: Activity) => {
        if (activity.id) {
            setActivities(activities.map(x => x.id === activity.id ? activity : x));
            setSelectedActivity(activity);
        } else {
            const newActivity = {...activity, id: activities.length.toString()};
            setSelectedActivity(newActivity);
            setActivities([...activities, newActivity]);
        }
        setEditMode(false);
    }

    const handleDelete = (id: string) => {
        setActivities(activities.filter(x => x.id !== id))
        if (selectedActivity?.id === id) {
            handleCancelSelectActivity();
        }
    }

    return (
        <Box sx={{bgcolor: '#eeeeee'}}>
            <CssBaseline />
            <NavBar openForm = {handleOpenForm} />
            <Container maxWidth = 'xl' sx={{mt: 3}}>
                <ActivitiyDashboard 
                        activities={activities} 
                        selectActivity={handleSelectActivity} 
                        cancelSelectActivity={handleCancelSelectActivity}
                        selectedActivity={selectedActivity}
                        editMode={editMode}
                        openForm={handleOpenForm}
                        closeForm={handleFormClose}
                        submitForm={handleSubmitForm}
                        deleteActivity={handleDelete}
                />
            </Container>
        </Box>
    )
}

export default App
import {List, ListItem, ListItemText, Typography} from "@mui/material"
import axios from "axios"
import {useEffect, useState } from "react"

function App() {
  const title = 'Reactivities'
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // Fetch activities from the API
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
      .catch(error => console.error('Error fetching activities:', error))
    // Cleanup function to avoid memory leaks
    return () => {}
  }, [])

  return (
    <>
      <Typography variant="h3">{title}</Typography>
      <List>
        {activities.map((activity) => 
          (
            <ListItem key={activity.id}>
              <ListItemText>{activity.title}</ListItemText>
            </ListItem>
          ))}
      </List>
    </>
  )
}

export default App

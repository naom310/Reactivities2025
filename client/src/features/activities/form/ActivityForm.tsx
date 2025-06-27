import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import { categoryOptions } from "./categoryOptions";
import SelectInput from "../../../app/shared/components/SelectInput";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function ActivityForm() {
    const {control, reset, handleSubmit} = useForm<ActivitySchema>({
                                                                    mode: 'onTouched',
                                                                    resolver: zodResolver(activitySchema)
                                                                }); 
    const {id} = useParams();
    const {updateActivity, createActivity, activity, isLoadingActivity} = useActivities(id);
    const navigate = useNavigate();

    useEffect(() => {
        if (activity) reset(
                            {...activity, 
                                location: {
                                    city: activity.city,
                                    venue: activity.venue,
                                    latitude: activity.latitude,
                                    longitude: activity.logitude
                                }
                            }
                        );
    }, [activity, reset])

    const onSubmit = async (data: ActivitySchema) => {
        const {location, ...rest} = data;
        const flattenedData = {...rest, ...location};
        try {
            if (activity) {
                updateActivity.mutate({...activity, ...flattenedData}, {
                    onSuccess: () => navigate(`/activities/${activity.id}`)
                })
            } else {
                createActivity.mutate(flattenedData, {
                    onSuccess: (id) => navigate(`/activities/${id}`)
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoadingActivity) return <Typography variant="h6" color="error">Loading activity...</Typography>;
    if (!activity && id) return <Typography variant="h6" color="error">Activity not found...</Typography>;

    return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant="h5" gutterBottom color="primary"> 
            {!id ? 'Create Activity' : 'Edit Activity'}
        </Typography>
        <Box component = 'form' onSubmit={handleSubmit(onSubmit)} display = 'flex' flexDirection = 'column' gap = {3}>
            <TextInput label = 'Title' control = {control} name = 'title' />
            <TextInput label = 'Description' control = {control} name = 'description' multiline rows = {3} />
            <Box display = 'flex' gap = {3} >
                <SelectInput
                        items = {categoryOptions} 
                        label = 'Category' 
                        control = {control} 
                        name = 'category' />
                <DateTimeInput label = 'Date' control = {control} name = 'date' />
            </Box>
            <LocationInput control = {control} label='Enter the location.' name = "location" />
            <Box display = 'flex' justifyContent = 'flex-end'> 
                <Button color = 'inherit' onClick={() => navigate('/activities')} >Cancel</Button>
                <Button type = "submit" 
                        color = 'success' 
                        variant = 'contained' 
                        disabled={updateActivity.isPending || createActivity.isPending} 
                >Submit</Button>
            </Box>
        </Box>
    </Paper>
    )
}
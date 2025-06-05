import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";

export default function ActivitiyDashboard() 
{
    return (
    <Grid2 container spacing={3}>
        <Grid2 size={7}>
            <ActivityList />
        </Grid2>
        <Grid2 size={5}>
            Activities filters goes here ...
        </Grid2>
    </Grid2>
    )
}
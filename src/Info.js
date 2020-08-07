import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";

function Info({ title, cases, total }) {
    return (
        <Card className="infoBox">
            <CardContent>

            <Typography className="infoBox__title" color="textSecondary">
             {title}
            </Typography>

            <h2 className="infoBox__cases">{cases} Today</h2>

            <Typography className="infoBox__total">
                {total} Total
            </Typography>

            </CardContent>
        </Card>
    )
}

export default Info

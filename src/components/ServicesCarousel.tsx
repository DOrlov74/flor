import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, MobileStepper, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { images, services } from "../content/services";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { florSecondary } from "../theme/colors";
import { useNavigate } from "react-router-dom";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const buttonStyle = {
    '&, &:link, &.visited': {
        textTransform: 'none',
        color: 'white',
        transition: 'all .2s'
    },
    '&:hover': {
        transform: 'translateY(-5px)'
    },
    '&:active, &:focus': {
        transform: 'translateY(-2px)'
    }
}

export default function ServicesCorousel(){
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = Object.entries(images).length;
    let navigate = useNavigate();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };
    return(
        <Box sx={{ maxWidth: 400, flexGrow: 1, position: "relative", m: 'auto'}}>
            <Paper
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    color: 'white',
                    bgcolor: 'transparent',
                }}
            >
                <Typography >{services[activeStep].name}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                interval={5000}
                onClick={()=>navigate('/services')}
            >
                {services.map((step, index) => {
                    let image;
                    Object.entries(images).find(([k, v]) => {
                        if (k===services[activeStep].id){
                            image=v;
                            return true;
                        }else{
                            return false;
                        }});
                    return (
                        <div key={step.name}>
                            {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    height: 255,
                                    display: 'block',
                                    maxWidth: 400,
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={image}
                                alt={step.name}
                            />
                            ) : null}
                        </div>
                    )
                })}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                sx={{
                    bgcolor: 'transparent', 
                    color: 'white', 
                    borderRadius: '10px',
                    "& .MuiMobileStepper-dot": {backgroundColor: 'white'},
                    "& .MuiMobileStepper-dotActive": {backgroundColor: florSecondary[900]}
                }}
                activeStep={activeStep}
                nextButton={
                <Button
                    sx={buttonStyle}
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                >
                    Next
                    {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                    ) : (
                    <KeyboardArrowRight />
                    )}
                </Button>
                }
                backButton={
                <Button 
                    sx={buttonStyle} 
                    size="small" 
                    onClick={handleBack} 
                    disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                    ) : (
                    <KeyboardArrowLeft />
                    )}
                    Back
                </Button>
                }
            />
        </Box>
    )
}
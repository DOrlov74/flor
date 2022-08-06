import { Box, Grid, Typography } from "@mui/material";
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';
import { useContext, useState } from "react";
import faqsback from "../assets/note_opt.jpg";
import { faqs } from "../content/faqs";
import { florPrimary } from "../theme/colors";
import { LangContext } from "../components/LanguageProvider";

const faqsContainerStyle = {
    background: `url(${faqsback})`,
    backgroundSize: 'cover',
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: 'white',
    
} as const;

export const quoteBoldStyle = {
  fontSize: {xs:'1rem', md:'1.2rem'},
  lineHeight: '1.2rem',
  textAlign: 'left',
  fontFamily: 'kaushan-script',
  fontWeight: 700,
  fontStyle: 'italic',
} as const;

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .1)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

export default function Faqs(){
  const {language}=useContext(LangContext);
    const [expanded, setExpanded] = useState<string>('panel1');

    const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        if (newExpanded)
            setExpanded(panel);
    };

    return (
      <Box sx={faqsContainerStyle}>
            <Grid container spacing={2} sx={{maxWidth: 'xl'}}>
              <Grid item xs={12} md={8} >
                <Typography gutterBottom 
                  variant="h4" component="div" 
                  color={florPrimary[900]}
                  sx={{m: '1rem auto', textAlign: 'center'}}>
                {language ? 'Perguntas Frequentes' : 'Freqently asked Questions'}
                </Typography>
                {faqs.map(f => (
                    <Accordion key={f.id} 
                        expanded={expanded === `panel${f.id}`} 
                        onChange={handleChange(`panel${f.id}`)}
                        sx={{width: {xs: '350px', md: '700px'}, m: '0 auto'}}>
                        <AccordionSummary aria-controls={`panel${f.id}-content`} id={`panel${f.id}-header`}>
                            <Typography sx={quoteBoldStyle}>{f.id}.  {language ? f.title : f.enTitle}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                              {language ? f.content : f.enContent}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
              </Grid>
              <Grid item xs={12} md={4}>

              </Grid>
            </Grid>
      </Box>
    );
}
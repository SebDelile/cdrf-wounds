import { useState } from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EXPLANATION } from '@/constants/explanation';
import woundsTableImage from 'public/carte-c3_tableau-blessures.jpg';
import { INPUTS_INFO } from '@/constants/inputsInfo';

export function ExplanationDialog({}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        scroll="paper"
        maxWidth="md"
      >
        <DialogTitle sx={{ paddingRight: '4rem' }}>
          Règles de résolution du jet de blessure
          <IconButton
            aria-label="close"
            onClick={() => setIsOpen(false)}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              minWidth: '3rem',
              borderRadius: '4px',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            textAlign: 'justify',
          }}
        >
          <DialogContentText>{EXPLANATION.disclaimer}</DialogContentText>
          <DialogContentText>{EXPLANATION.intro}</DialogContentText>
          <DialogContentText>{EXPLANATION.rule}</DialogContentText>
          <Accordion disableGutters sx={{ borderRadius: '0.25rem !important' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <DialogContentText>Tableau des blessures</DialogContentText>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingTop: 0 }}>
              <Image
                style={{ width: '100%', height: '100%' }}
                src={woundsTableImage}
                alt="Tableau des blessures"
              />
            </AccordionDetails>
          </Accordion>
          <DialogContentText
            component="ul"
            sx={{
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <li>{EXPLANATION.smallerDice}</li>
            <li>{EXPLANATION.biggerDice}</li>
          </DialogContentText>
          <DialogContentText>{EXPLANATION.resultReading}</DialogContentText>
          <DialogContentText>{EXPLANATION.EffectsIntro}</DialogContentText>
          <Accordion
            disableGutters
            sx={{
              borderRadius: '0.25rem !important',
              '&::before': { height: 0 },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <DialogContentText>Détail des Effets</DialogContentText>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingTop: 0 }}>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {Object.values(INPUTS_INFO).map(({ label, description }) => (
                  <DialogContentText component="li" key={label}>
                    <b>{label}</b>
                    {' : '}
                    {description}
                  </DialogContentText>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            p: '1rem 1.5rem',
          }}
        >
          <DialogContentText>
            {EXPLANATION.linkCDRFTextIntro}
            <a
              href={EXPLANATION.linkCDRFUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {EXPLANATION.linkCDRFText}
            </a>
            {'.'}
          </DialogContentText>
          <DialogContentText sx={{ margin: '0 !important' }}>
            {EXPLANATION.linkGitHubTextIntro}
            <a
              href={EXPLANATION.linkGitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {EXPLANATION.linkGitHubText}
            </a>
            {'.'}
          </DialogContentText>
        </DialogActions>
      </Dialog>
      <Button onClick={() => setIsOpen(true)} sx={{ textTransform: 'none' }}>
        Règles de résolution du jet de blessure
      </Button>
    </>
  );
}

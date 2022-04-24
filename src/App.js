import { useState } from 'react'
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, Grid, Box, createTheme, Typography, Divider } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import MarkdownInput from './MarkdownInput';
import ReactCodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';

function App() {

  const [htmlData, setHtmlData] = useState(null)

  const theme = createTheme({
    typography: {
      fontFamily: 'Roboto'
    },}
  );

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Typography variant="h1">Markdown Converter</Typography>
          <Grid container spacing={5} sx={{ border: 1, borderColor: 'divider', borderRadius: '10px', margin: '1em' }}>
            <Grid item xs={3.95} padding={0}>
              <MarkdownInput updateHtml={html => setHtmlData(html)} />
            </Grid>
            <Divider orientation="vertical" flexItem xs={0.15} />
            <Grid item xs={3.95} padding={0}>
              <Container>
                <Typography variant="h4" marginBottom="1em">HTML Preview</Typography>
                <Box sx={{textAlign: 'left'}}>
                  {htmlData && <div dangerouslySetInnerHTML={{ __html: htmlData }}></div>}
                </Box>
              </Container>
            </Grid>
            <Grid item xs={3.95} padding={0}>
              <Container>
                <Typography variant="h4" marginBottom="1em">HTML Source</Typography>
                <Box sx={{textAlign: 'left'}}>
                  {htmlData && <ReactCodeMirror
                   value={htmlData}
                   extensions={[html()]}
                    />}
                </Box>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
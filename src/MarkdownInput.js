import React from 'react';
import { Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

let currentMarkdownInput = undefined;

class MarkdownInput extends React.Component {
    constructor(props) {
        super(props);
        this.updateHtml = props.updateHtml;
        currentMarkdownInput = this;
        this.state = {currentInput: "## Click the button below!"};
    }

    convertMarkdown() {
        // Set post contents: https://masteringjs.io/tutorials/axios/post
        // For some reason, I can't use "this" in here to read state or call updateOutput from;
        axios.post('/convert', { md_input: currentMarkdownInput.state.currentInput })
            .then(response => {
                currentMarkdownInput.updateOutputFromResponse(response)
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
    }


    updateOutputFromResponse(response) {
        let html = response.data.md_html;
        this.updateHtml(html);
    }

    // Get data from text field: https://reactforyou.com/how-to-get-data-from-material-ui-textfield-in-react/ 
    setCurrentInput = event => {
        this.setState({
          currentInput: event.target.value
        });
      };

    render() {
        return (
            <form>
                <Typography variant="h4" marginBottom="1em">Markdown</Typography>
                <TextField id="md-input" multiline minRows={12} fullWidth onChange={this.setCurrentInput} value={this.state.currentInput}></TextField>
                <Button variant="contained" onClick={this.convertMarkdown} size="large" sx={{ margin: '1em' }}>Generate HTML</Button>
            </form>);
    }
}

export default MarkdownInput;
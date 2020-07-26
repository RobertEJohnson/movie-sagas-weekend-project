import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {Fade} from 'react-reveal';
import {Chip, Icon, Button, Card, CardHeader, CardContent, Grid, TextField, Typography} from '@material-ui/core';
import {Done} from '@material-ui/icons'
class Edit extends Component{

    state = {
        id: null,
        title: '',
        description: '',
        poster: '',
        genres: [],
        editState: {
            
        }
    }
    componentDidMount(){
        //on load grab all the movies from the database to make sure nothing has been updated
        this.props.dispatch({type: 'FETCH_MOVIES'})
    }

    componentDidUpdate(previousProps){
        //when reduxState changes with the FETCH_MOVIES GET, run this conditional
        if(this.props.reduxState !== previousProps.reduxState){

            //grab the id param from the url in the match object on props
            const id = Number(this.props.match.params.id);

            //search the movies array in redux with the index of id - 1 
            let movie = this.props.reduxState.movies[id-1];
            this.setState({
                ...this.state,
                id: movie.id,
                title: movie.title,
                poster: movie.poster,
                description: movie.description,
                genres: movie.array_agg
            })
        }
    }

    backToDetails = ()=>{
        this.props.history.push('/details/'+this.state.id);
    }

    updateMovie = ()=>{
        //make a put request with a saga to update
        //payload = {payload: {}}
        //this.props.dispatch({type: 'UPDATE_MOVIE', })

        this.props.history.push('/details/'+this.state.id);
    }

    handleDelete = ()=>{

    }

    render(){
        const cardStyle = {
            background: 'linear-gradient(135deg, coral, darkgray )'
        }

        const yMargin = {
            margin: '10px 0px 0px 0px'
        }
        const yPadding = {
            padding: '10px 0px 0px 0px'
        }
        const textField = {
            width: '100%'
          }

        return(
            <>
               { this.state.id != null ?
                <Grid container justify='center'>
                        <Grid item xs={12} sm={10} md={8} align='center'>
                            <Fade left duration={450}>
                                <Card style={cardStyle}>
                                    <CardHeader title={this.state.title} style={yPadding}/>
                                    <CardContent>
                                        <img src={this.state.poster}></img>
                                        <Typography>
                                            <h3 style={yMargin}>Edit Description</h3>
                                        </Typography>
                                        <TextField 
                                            style={textField}
                                            rows={10} 
                                            multiline 
                                            label="Description"
                                            variant="filled" 
                                            inputProps={{maxLength: 1250}}
                                            value={this.state.description}  
                                            />
                                        <h4 style={yMargin}>Edit Genres</h4>
                                        <p style={yMargin}>
                                            {
                                                this.state.genres.map(genre=>
                                                    <Chip label={genre} onDelete={this.handleDelete}/>)
                                            }
                                        </p>
                                        <br></br>
                                        <Button variant='contained' color="secondary" onClick={this.backToDetails}>Clear</Button>
                                        <Button variant="contained" color="primary" onClick={this.updateMovie}>Save</Button>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                </Grid>
                  :
                <>
                </>
               }
            </>
        )
    }
}

const mapStateToProps = (reduxState)=>({
    reduxState
})

export default connect(mapStateToProps)(withRouter(Edit));
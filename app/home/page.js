import {useState} from 'react'
import {Divider, Grid, Slide, Typography} from '@mui/material'
/*import { useRouteMatch } from 'react-router-dom';*/
import Footer from '../../components/Footer/Footer'
import CreateBoard from '@/components/Boards/CreateProject/CreateProject'
import RecentProjects from '@/components/Boards/RecentProjects/RecentProjects'
import LandingImage from './../../images/background.jpg'
import SessionControllerImage from './../../images/Session.jpg'

const Home = () => {
  const [isJoin, setIsJoin] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}>
        <Grid
          container
          item
          sm={12}
          lg={9}
          justify="center"
          alignItems="center"
          spacing={3}>
          <Grid
            item
            sm={12}
            lg={6}>
            <Slide
              direction="down"
              in={true}
              timeout={1000}>
              <div className="HomePageContainer">
                <Typography variant="h5">Task Board App</Typography>
                <img
                  alt="React Task board App"
                  className="w-80 md:w-full"
                  src={LandingImage}></img>
                <Typography variant="subtitle1">
                  Free / Open source React MaterialUI Template - Task Board App.
                  Template comes with most essential things of Typescript, Lint,
                  prettier, React Router, Material-UI and Cool Landing Page to
                  bootstrap your web app. Just clone the Repo and start building
                  your app.
                </Typography>
              </div>
            </Slide>
          </Grid>
          <Grid
            item
            sm={12}
            lg={6}>
            <div className="HomePageContainer">
              {isJoin ? <RecentProjects /> : <CreateBoard />}
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          lg={9}
          justify="center"
          alignItems="center"
          spacing={3}>
          <Grid
            item
            sm={12}
            lg={6}>
            <Slide
              in={true}
              direction="up"
              timeout={1000}>
              <Divider variant="middle"></Divider>
            </Slide>
          </Grid>
        </Grid>

        <Grid
          container
          item
          sm={12}
          lg={9}
          justify="center"
          alignItems="center"
          spacing={3}>
          <Grid
            item
            sm={12}
            lg={6}>
            <Slide
              in={true}
              direction="up"
              timeout={1500}>
              <div className="HomePageContainer">
                <RecentProjects />
              </div>
            </Slide>
          </Grid>

          <Grid
            item
            sm={12}
            lg={6}>
            <Slide
              in={true}
              direction="up"
              timeout={1500}>
              <div className="HomePageContainer">
                <Typography variant="subtitle1">
                  Here is your recent Task Boards, click on the Board name to
                  view the tasks.
                </Typography>
              </div>
            </Slide>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          lg={9}
          justify="center"
          alignItems="center"
          spacing={3}>
          <Grid
            item
            sm={12}
            lg={6}>
            <Slide
              in={true}
              direction="up"
              timeout={2000}>
              <Divider variant="middle"></Divider>
            </Slide>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={12}
          lg={9}
          justify="center"
          alignItems="center"
          spacing={3}>
          <Grid
            item
            sm={12}
            lg={6}>
            <Slide
              in={true}
              direction="up"
              timeout={2000}>
              <div className="HomePageContainer">
                <Typography variant="h5">Intuitive UI Design</Typography>
                <Typography variant="subtitle1">
                  Beautiful design for managing tasks, ability to add and delete
                  tasks. Drag and Drop feature to move the task across different
                  stage in the Kanban board.
                </Typography>
              </div>
            </Slide>
          </Grid>

          <Grid
            item
            sm={12}
            lg={6}>
            <Slide
              in={true}
              direction="up"
              timeout={2000}>
              <div className="HomePageContainer">
                <img
                  className="SessionImage"
                  alt="Session controller"
                  src={SessionControllerImage}></img>
              </div>
            </Slide>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default Home

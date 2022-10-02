import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './App.css'
import ProjectItem from './components/ProjectItem/index'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class App extends Component {
  state = {
    listOfProjects: [],
    activeOptionId: categoriesList[0].id,
    error: false,
    isLoading: false,
  }

  componentDidMount() {
    this.getListOfProjects()
  }

  updateSelectOption = event => {
    this.setState(
      {listOfProjects: [], activeOptionId: event.target.value},
      this.getListOfProjects,
    )
  }

  retry = () => {
    this.getListOfProjects()
  }

  getListOfProjects = async () => {
    this.setState({isLoading: true, error: false})
    const {activeOptionId} = this.state
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${activeOptionId}`
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      this.setState({error: false})
      this.setState({listOfProjects: data.projects})
    } catch {
      this.setState({error: true})
    }
    this.setState({isLoading: false})
  }

  renderContnetView = () => {
    const {listOfProjects} = this.state
    return (
      <div className="contentContainer">
        <div className="projectsContainer">
          {listOfProjects.map(each => (
            <ProjectItem key={each.id} item={each} />
          ))}
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failureViewContainer">
      <img
        className="failureImage"
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
      <p>we cannot see the page you are looking for</p>
      <button className="retryButton" type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  render() {
    const {isLoading, error} = this.state
    const loaderView = isLoading ? <Loader type="ThreeDots" color="blue" /> : ''
    const content = error ? this.renderFailureView : this.renderContnetView
    return (
      <div className="MainContainer">
        <div className="header">
          <img
            className="websitelogo"
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
          />
        </div>
        <select onChange={this.updateSelectOption} className="selectEl">
          {categoriesList.map(each => (
            <option key={each.id} value={each.id} id={each.id}>
              {each.displayText}
            </option>
          ))}
        </select>
        {loaderView}
        {content()}
      </div>
    )
  }
}
export default App

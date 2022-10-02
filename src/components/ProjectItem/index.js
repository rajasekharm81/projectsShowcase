import {Component} from 'react'
import './index.css'

class ProjectItem extends Component {
  render() {
    const {item} = this.props
    return (
      <div className="projectItemConatainer">
        <img className="tumbanailImg" src={item.image_url} alt={item.name} />
        <h1>{item.name}</h1>
      </div>
    )
  }
}
export default ProjectItem

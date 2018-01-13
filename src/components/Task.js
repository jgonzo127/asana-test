import React from 'react';

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove() {
        console.log(this.props.id);
        this.props.onRemove(this.props.id);
    }

    render() {
        return(
            <div className="task-container">
                <p className="task-title"><a target="_blank" href={`https://app.asana.com/0/${this.props.project}/${this.props.id}`}>{this.props.name}</a></p>
                <button className="task-button" onClick={this.handleRemove}>Complete</button>
            </div>
        )
    }
}

export default Task;
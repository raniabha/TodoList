import React, { Component } from 'react'

export default class ToDoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            item : '',
            itemlist: JSON.parse(localStorage.getItem("todolist")) ? JSON.parse(localStorage.getItem("todolist")) : []
            // itemlist: [{id: 0.24214, value: "banana"}, {id: 0.784831, value: "kjdbflkj"}]
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addItem = () => {
        if(this.state.item !== ''){
            const itemWithKey = {
                id: Math.random(),
                value: this.state.item
            }
            let localitemlist = this.state.itemlist;
            localitemlist.push(itemWithKey)
            this.setState({
                itemlist: localitemlist,
                item: ''
            })
        }
        localStorage.setItem("todolist", JSON.stringify(this.state.itemlist))
    }

    deleteItem = (id) => {
        const updatedlist = this.state.itemlist.filter(item => item.id !== id)
        this.setState({
            itemlist: updatedlist
        })
        localStorage.removeItem("todolist")
        localStorage.setItem("todolist", JSON.stringify(updatedlist))
    }

    render() {
        return (
            <div class="container mr-40 mt-40">
                <div class="input-group mb-3">
                    <input name="item" onChange={this.handleChange} value={this.state.item} type="text" class="form-control" placeholder="item name..." />
                    <button class="btn btn-outline-secondary" onClick={this.addItem} type="button">Add</button>
                </div>
                <ul class="list-group">
                    {this.state.itemlist.map(item => {
                        return(
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                {item.value}
                                <span class="badge badge-pill">
                                    <button class="btn btn-primary " onClick={() => this.deleteItem(item.id)}>delete</button>
                                </span>
                            </li>                    
                        )
                    })}
                </ul>
            </div>

        )
    }
}

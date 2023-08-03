import React from "react";
class UserClass extends React.Component{
    constructor (props) {
        super(props);
        //console.log(props);

        this.state = {
            userInfo : {
                name : "Dummy",
                location : "default",
            },
        };
    }

    async componentDidMount () {
        const data = await fetch("https://api.github.com/users/fizail");
        const json = await data.json();
        console.log(json);
        this.setState({
            userInfo : json,
        });
    }
    render() {
        const {login , url , location , avatar_url} = this.state.userInfo;
       
        return (
            <div className="px-5 m-1 py-2 h-[350px] bg-gray-200 w-64 shadow-lg">
                <h1>Name : {login}</h1>
                <img className="w-[200px]" src={avatar_url} alt="logo" />

                <h2 >git URl : {<a className="text-red-600" href={url} target="_blank">gitLink</a>}</h2>
                <h3>Location : {location}</h3>
            </div>
        )
          
    }
}

export default UserClass;
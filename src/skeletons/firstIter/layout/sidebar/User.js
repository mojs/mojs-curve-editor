import React from 'react'
import Gravatar from 'react-gravatar'

export default class Component extends React.Component {
  render() {
    console.log(this.props.data);
    const {user: {name, email}} = this.props.data;
    let dateHours = new Date().getHours();
    let welcomeText = (dateHours >= 0 && dateHours < 4) ? 'Доброй ночи,' :
                      (dateHours >= 4 && dateHours < 11) ? 'Доброе утро,' :
                      (dateHours >= 11 && dateHours < 17) ? 'Доброй день,' :
                      (dateHours >= 17 && dateHours < 23) ? 'Добрый вечер,' :
                      (dateHours >= 23 && dateHours < 24) ? 'Доброй ночи,' :
                      'Мы потеряли часы,' ;
    return (
      <div className="widget stay-on-collapse" id={"widget-welcomebox"}>
        <div className="widget-body welcome-box tabular">
            <div className="tabular-row">
                <div className="tabular-cell welcome-avatar">
                    <a href="#"><Gravatar email={email} size={96} className="avatar" /></a>
                </div>
                <div className="tabular-cell welcome-options">
                    <span className="welcome-text">{welcomeText}</span>
                    <a href="#" className="name">{name}</a>
                </div>
            </div>
        </div>
      </div>)
  }
}

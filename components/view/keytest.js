import React from 'react';
import AuthService from '../../utils/auth';

const containerStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: '#ddd',
  display: 'flex',
  alignItems: 'center',
};

class KeyTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      check: false,
    };
    this.auth = new AuthService();
    this.get();
  }

  async get() {
    const response = await this.auth.callApi(`${process.env.API_BASE_URL}/key`, {
      method: 'GET',
    }, true).catch(console.error);
    if (response.key) {
      this.setState({ key: response.key.key });
    }
  }

  async check() {
    const response = await this.auth.callApi(`${process.env.API_BASE_URL}/key/check`, {
      method: 'POST',
      body: JSON.stringify({ key: this.input.value }),
    }, true).catch(console.error);
    this.setState({ check: response.valid });
  }

  async generate() {
    const response = await this.auth.callApi(`${process.env.API_BASE_URL}/key/create`, {
      method: 'POST',
    }, true).catch(console.error);
    if (response.key) {
      this.setState({ key: response.key.key });
    }
  }

  async revoke() {
    const { key } = this.state;
    const response = await this.auth.callApi(`${process.env.API_BASE_URL}/key`, {
      method: 'DELETE',
      body: JSON.stringify({ key }),
    }, true).catch(console.error);
    console.log(response);
  }

  render() {
    const { key, check } = this.state;
    return (
      <div style={containerStyle}>
        <div>
          <span>My API key: {key}</span>
          <br/>
          <button onClick={()=>this.generate()}>Generate</button>
          <br/>
          <input ref={(input)=>this.input=input}></input>
          <button onClick={()=>this.check()}>Check</button>
          <span>{check ? "Valid key" : "Invalid Key"}</span>
          <br/>
          <button onClick={()=>this.revoke()}>Revoke</button>
        </div>
      </div>
    );
  }
}

export default KeyTest;

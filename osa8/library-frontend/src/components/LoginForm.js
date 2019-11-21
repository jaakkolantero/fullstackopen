import React, { useState } from "react";

const LoginForm = ({ setToken, login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async event => {
    event.preventDefault();
    const result = await login({
      username,
      password
    });

    if (result) {
      const token = result.login.value;
      setToken(token);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;

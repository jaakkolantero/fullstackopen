import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Link, useParams } from "react-router-dom";

const UserCard = ({ users }) => {
  let { userId } = useParams();
  const user = users.filter(user => user.id === userId);
  console.log("user", user);

  const blogList = blogs => {
    return blogs ? (
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            {blog.title} by {blog.author}
          </li>
        ))}
      </ul>
    ) : (
      <div>User has no blogs</div>
    );
  };
  return user.length ? (
    <div>
      {user[0].name}
      <h3>Added blogs</h3>
      {blogList(user[0].blogs)}
    </div>
  ) : (
    <div>user not found</div>
  );
};

const UsersListing = () => {
  const users = useSelector(state => state.users);

  const usersList = () => {
    return (
      <div>
        <h2>Users</h2>
        <h3>user - blogs created</h3>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <Link
                className="text-blue-700 hover:text-blue-500"
                to={`/users/${user.id}`}
              >
                {user.name}
              </Link>{" "}
              {user.blogs.length}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  console.log("users", users);
  return users ? (
    <Switch>
      <Route path={"/users/:userId"}>
        <UserCard users={users} />
      </Route>
      <Route>{usersList()}</Route>
    </Switch>
  ) : null;
};

export default UsersListing;

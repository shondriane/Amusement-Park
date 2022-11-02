import { useParams, Link } from "react-router-dom";

const NewAccount = (props) => {
  const { userId, name } = useParams();

  return (
    <div className="third">
      <h2>Welcome {name}! </h2>
      <h4>Please save/bookmark the folowing url as it will be how you will login in
      the future to your account.</h4>
      <h3>
      {
        <Link to={`/account/${userId}/rides`}>
          http://localhost:3000/account/{userId}/rides
        </Link>
      }
      </h3>
      
      <h4>Click the url above to visit our website with your newly created account.</h4>
    </div>
  );
};

export default NewAccount;

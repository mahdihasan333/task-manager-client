// import TaskManagement from "../components/TaskManagement";

import LoadingSpinner from "../components/LoadingSpinner";
import LogoutUserPage from "../components/logoutUserPage";
import { TaskSection } from "../components/TaskSection";
import useAuth from "../hooks/useAuth";

const Home = () => {

  const {user, loading} = useAuth()

  if(loading) {
    return <LoadingSpinner/>
  }

  return (
    <div>
      
      {/* <TaskManagement /> */}
      <div className="w-11/12 mx-auto">
        {
          user ? <TaskSection/> : <LogoutUserPage/>
        }
      </div>
    </div>
  );
};

export default Home;

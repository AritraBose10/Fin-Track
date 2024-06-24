import "./assets/home.css";
import Card from "./card";
import ChatBox from "./chatbox";
import Search from "./searchbar";
import Sidebar from "./sidebar";
import TransactionCard from "./transactioncard";

function Home() {
  return (
    <>
      <div className="home">
        <div>
          <Sidebar />
        </div>
        <div>
          <Search />
        </div>
        <div>
          <Card left="20%" top="12%" />
          <Card left="45%" top="12%" />
          <Card left="20%" top="45%" />
          <Card left="45%" top="45%" />
          <ChatBox />
          <TransactionCard />
        </div>
      </div>
    </>
  );
}

export default Home;

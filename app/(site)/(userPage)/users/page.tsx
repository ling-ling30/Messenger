import MobileFooter from "./_components/MobileFooter";
import Sidebar from "./_components/Sidebar";

type Prop = {};

const UserPage = (prop: Prop) => {
  return (
    <>
      <MobileFooter />
      <div className="flex w-full h-full">
        <Sidebar />
        <div className="h-full w-full flex bg-slate-100 items-center justify-center px-6">
          THIS IS USER PAGE
        </div>
      </div>
    </>
  );
};

export default UserPage;

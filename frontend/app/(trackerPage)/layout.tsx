import Navbar from "./components/navbar";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            {children}
        </div>
    );
};

export default Layout;

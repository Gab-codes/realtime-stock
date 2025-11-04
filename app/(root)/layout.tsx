import Footer from "@/components/root/Footer";
import Navbar from "@/components/root/Navbar";
import ScrollToTop from "@/components/root/ScrollToTop";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default layout;

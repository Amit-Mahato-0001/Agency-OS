import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AppLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eef1f7]">

      {/* TOP GRADIENT SECTION */}
      <div
        className="
          h-[48vh]
          w-full
          bg-[url('/7.webp')]
          bg-cover
          bg-center
          relative
        "
      >
        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 pt-8 flex justify-between items-center text-white">
          <img src="/Union.png" className="max-h-20 max-w-40"/>

          <button
            onClick={handleLogout}
            className="bg-white/20 border border-white/10 text-white font-medium px-4 py-2 text-sm rounded-full transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA (important: flex-1) */}
      <div className="flex-1">

        <div className="max-w-6xl mx-auto px-6 -mt-40 relative z-10">

           <div className="flex gap-3 mb-6">

            {[
              { name: "Dashboard", to: "/" },
              { name: "Projects", to: "/projects" },
              { name: "Clients", to: "/clients" },
              { name: "Audit Logs", to: "/audit-logs" },

            ].map((item) => {

              const isActive = item.to === '/' 
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to)

              return(

                <a href={item.to}
                key={item.name}
                className={`
                px-4 py-2
                text-sm
                font-medium
                rounded-full
                transition
                
                ${
                  isActive ? "bg-white/20 text-white border border-white/10" : "text-white hover:bg-white/20 hover:border border-white/10"
                }`}>

                  {item.name}
                </a>
              )
            })}

          </div>

          <div className="relative">

            {/* BACK GLASS SURFACE */}
            <div
              className="
                absolute
                -inset-[7px]
                rounded-[34px]
                bg-white/30
                border border-white/10
              "
            />

            {/* MAIN CARD */}
            <div
              className="
                relative
                rounded-[28px]
                bg-white
                p-10
                shadow-[0_35px_90px_rgba(15,23,42,0.25)]
              "
            >
              {children}
            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-[#000000] text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* Logo */}
          <div className="mb-6">
            <img src="/Union.png" className="max-h-20 max-w-40"/>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 mb-6" />

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm text-white/70">
            <span>© 2026 AgencyOS Inc</span>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Articles</a>
            <a href="#" className="hover:text-white">Services</a>
            <a href="#" className="hover:text-white">Our Team</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>

        </div>
      </footer>

    </div>
  );
}
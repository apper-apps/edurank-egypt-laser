import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navigationItems = [
    {
      path: "/universities",
      label: "Universities",
      icon: "GraduationCap"
    },
    {
      path: "/rankings",
      label: "Rankings",
      icon: "Trophy"
    },
    {
      path: "/admin",
      label: "Admin",
      icon: "Settings"
    }
  ];
  
  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 bg-primary ${isCollapsed ? 'lg:w-16' : 'lg:w-64'} transition-all duration-300`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <ApperIcon name="GraduationCap" size={28} className="text-secondary" />
              <span className="font-display font-bold text-lg text-white">
                EduRank Egypt
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <ApperIcon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={18} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center' : ''}`
                  }
                >
                  <ApperIcon name={item.icon} size={20} />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {!isCollapsed && (
          <div className="p-4 border-t border-white/10">
            <div className="text-white/60 text-xs">
              Egyptian University Rankings Platform
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        <MobileSidebar navigationItems={navigationItems} />
      </div>
    </>
  );
};

const MobileSidebar = ({ navigationItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-primary px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ApperIcon name="GraduationCap" size={24} className="text-secondary" />
          <span className="font-display font-bold text-white">
            EduRank Egypt
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
        >
          <ApperIcon name="Menu" size={20} />
        </button>
      </div>
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative bg-primary w-64 h-full transform transition-transform duration-300">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ApperIcon name="GraduationCap" size={28} className="text-secondary" />
                <span className="font-display font-bold text-lg text-white">
                  EduRank Egypt
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <ApperIcon name="X" size={18} />
              </button>
            </div>
            
            <nav className="px-4 py-6">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `sidebar-link ${isActive ? 'active' : ''}`
                      }
                    >
                      <ApperIcon name={item.icon} size={20} />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
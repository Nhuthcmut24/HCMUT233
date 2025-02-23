import React, { useState, useEffect } from 'react';
import { MdOutlineSnippetFolder, MdOutlineBiotech } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { RiGraduationCapLine } from "react-icons/ri";
import {
  AppstoreOutlined,
  DesktopOutlined,
  MenuOutlined,
  CloseOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu, Layout } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavigateMenu.module.css';

type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;

const items: MenuItem[] = [
  { key: '1', icon: <HomeOutlined />, label: <Link to="/">Home</Link>, className: styles['menu-item'] },
  {
    key: 'sub1',
    label: 'Syllabus',
    icon: <IoBookOutline />,
    children: [
      { key: '2', label: <Link to="/syllabus">View syllabus</Link>, className: styles['menu-item'] },
      { key: '3', label: <Link to="/create-syllabus">Create syllabus</Link>, className: styles['menu-item'] },
    ],
    className: styles['menu-item'],
  },
  {
    key: 'sub2',
    label: 'Training Program',
    icon: <MdOutlineBiotech />,
    children: [
      { key: '4', label: <Link to="/program/view-program">View program</Link>, className: styles['menu-item'] },
      { key: '5', label: <Link to="/program/create-program">Create program</Link>, className: styles['menu-item'] },
    ],
    className: styles['menu-item'],
  },
  {
    key: 'sub3',
    label: 'Class',
    icon: <RiGraduationCapLine />,
    children: [
      { key: '6', label: <Link to="/class/list">View class</Link>, className: styles['menu-item'] },
      { key: '7', label: <Link to="/class/create/step1">Create class</Link>, className: styles['menu-item'] },
    ],
    className: styles['menu-item'],
  },
  { key: '8', icon: <DesktopOutlined />, label: <Link to="/training-calendar">Training calendar</Link>, className: styles['menu-item'] },
  {
    key: 'sub4',
    label: 'User management',
    icon: <FaUserGroup />,
    children: [
      { key: '9', label: <Link to="/user/list">User List</Link>, className: styles['menu-item'] },
      { key: '10', label: <Link to="/user/permission">User permission</Link>, className: styles['menu-item'] },
    ],
    className: styles['menu-item'],
  },
  { key: '11', icon: <MdOutlineSnippetFolder />, label: <Link to="/learning-materials">Learning materials</Link>, className: styles['menu-item'] },
  {
    key: 'sub5',
    label: 'Setting',
    icon: <AppstoreOutlined />,
    children: [
      { key: '12', label: <Link to="/setting/calendar">Calendar</Link>, className: styles['menu-item'] },
    ],
    className: styles['menu-item'],
  },
];

const NavigateMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const location = useLocation();

  const validPaths = {
    '/': '1',
    '/syllabus': '2',
    '/create-syllabus': '3',
    '/program/view-program': '4',
    '/program/create-program': '5',
    '/class/list': '6',
    '/class/create/step1': '7',
    '/training-calendar': '8',
    '/user/list': '9',
    '/user/permission': '10',
    '/learning-materials': '11',
    '/setting/calendar': '12',
  };

  useEffect(() => {
    if (validPaths[location.pathname]) {
      setSelectedKey(validPaths[location.pathname]);
    }
  }, [location.pathname]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`${styles.container} ${collapsed ? styles['container-collapsed'] : styles['container-expanded']}`}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        style={{ opacity: 0 }}
      />
      <Button
        type="link"
        onClick={toggleCollapsed}
        className={styles.button}
      >
        {collapsed ? <MenuOutlined style={{ color: 'black' }} /> : <CloseOutlined style={{ color: 'black' }} />}
      </Button>
      <Menu
        selectedKeys={[selectedKey]}
        defaultOpenKeys={Object.keys(validPaths).filter(path => location.pathname.startsWith(path))}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        className={styles.menu}
      />
    </div>
  );
};

export default NavigateMenu;

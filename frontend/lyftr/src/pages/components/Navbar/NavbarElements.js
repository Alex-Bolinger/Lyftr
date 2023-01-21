import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
  
export const Nav = styled.nav`
  background: #e83a3a;
  height: 85px;
  display: flex;
  justify-content: left;
  padding: 0.2rem calc(0);
  z-index: 12;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const NavBT = styled.nav`
  background: #e83a3a;
  height: 85px;
  display: flex;
  justify-content: right;
  padding: 0.2rem calc(0);
  z-index: 12;
  /* Third Nav */
  /* justify-content: flex-start; */
`;
  
export const NavLink = styled(Link)`
  color: #FFFFFF;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #000000;
  }
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #ffffff;
    color: #e83a3a;
  };
  }
`;
  
export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
  
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  /*margin-right: -24px;*/
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
  
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: right;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
 
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #FFFFFF;
  padding: 10px 22px;
  color: #e83a3a;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &.active {
    background: #f7b2b2;
    color: #a31717;
  }
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #ffd7d7;
    color: #e83a3a;
  }
`;
import React from 'react';
import * as Menubar from '@radix-ui/react-menubar';
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '@radix-ui/react-icons';
import { Link, NavLink } from 'react-router-dom';

const RADIO_ITEMS = ['Andy', 'Benoît', 'Luis'];
const CHECK_ITEMS = ['Always Show Bookmarks Bar', 'Always Show Full URLs'];

const MenubarDemo = () => {


  return (
    <div>
      <Menubar.Root className="flex justify-center py-[15px] bg-white p-[3px] rounded-md shadow-[0_2px_10px] shadow-blackA4">
        <Menubar.Menu>
          <Menubar.Trigger className=" py-2 px-3 outline-none select-none font-medium leading-none rounded text-violet11 text-[13px] flex items-center justify-between gap-[2px] data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
          <Link to="/"> Home</Link>
          </Menubar.Trigger>
          <Menubar.Trigger className="py-2 px-3 outline-none select-none font-medium leading-none rounded text-violet11 text-[13px] flex items-center justify-between gap-[2px] data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
           <Link to="/videos"> Videos</Link>
          </Menubar.Trigger>
          <Menubar.Trigger className="py-2 px-3 outline-none select-none font-medium leading-none rounded text-violet11 text-[13px] flex items-center justify-between gap-[2px] data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            <Link to="/user">Users</Link>
          </Menubar.Trigger>
          <Menubar.Trigger className="py-2 px-3 outline-none select-none font-medium leading-none rounded text-violet11 text-[13px] flex items-center justify-between gap-[2px] data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            Login
          </Menubar.Trigger>
        </Menubar.Menu>
      </Menubar.Root>
    </div>
  );
};

export default MenubarDemo;
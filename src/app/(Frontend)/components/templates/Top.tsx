'use client'

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { useState } from 'react'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

import { ThemeSwitcher } from '@/src/app/(Frontend)/components/util/ThemeSwitcher'

import logo from '@/public/Navbar_logo.png'

export function Top() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const path = usePathname()

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="pb-4"
      classNames={{
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" aria-current="page" color="foreground">
            <Image
              src={logo}
              alt="logo"
              className="object-fill"
              width={80}
              height={50}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex justify-center">
        <NavbarItem isActive={path.includes('/sobre-nosotros')}>
          <Link href="/sobre-nosotros" aria-current="page" color="foreground">
            Sobre nosotros
          </Link>
        </NavbarItem>
        <NavbarItem isActive={path.includes('/noticias')}>
          <Link href="/noticias" aria-current="page" color="foreground">
            Noticias
          </Link>
        </NavbarItem>
        <NavbarItem isActive={path.includes('/contactanos')}>
          <Link href="/contactanos" aria-current="page" color="foreground">
            Contactanos
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/Login" color="primary">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/Registro" color="primary">
            Registro
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

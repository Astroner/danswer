import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";

import { getAuthTypeMetadataSS, getCurrentUserSS } from "@/lib/userSS";

import cn from "./page.module.scss";

import brain from "./icons/brain.png";
import favorite from "./icons/favorite.png";
import file from "./icons/file.png";
import services from "./icons/services.png";
import forum from "./icons/forum.png";
import { UserDropdown } from "@/components/UserDropdown";

export default async function Page() {

    const [metadata, user] = await Promise.all([
        getAuthTypeMetadataSS(),
        getCurrentUserSS()
    ])

    if (metadata?.authType !== "disabled" && !user) {
      return redirect("/auth/login");
    }

    return (
        <div className={cn.root}>
            <div className={cn.header}>
                <UserDropdown user={user} />
            </div>
            <div className={cn.welcome}>
                <div className={cn.welcome__container}>
                    <div className={cn.logo}>
                        <svg width="90" height="100" viewBox="0 0 90 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 61H0V0H21.5L69 64V0H90V100H69L21 36V61Z" fill="#86C4CD"/>
                            <rect y="78" width="21" height="22" fill="#222222"/>
                        </svg>
                    </div>
                    <h1>
                        Welcome back!
                    </h1>
                    <p>
                        Description of the section, which will allow you to understand what actions can be performed by following this link.
                    </p>
                </div>
            </div>
            <div className={cn.cards}>
                <div className={cn.cards__container}>
                    <div className={cn.row}>
                        <Link href="/chat" className={cn.card}>
                            <div className={cn.card__text}>
                                <h2>Legal brain</h2>
                                <p>
                                    Description of the section, which will allow you to understand what actions can be performed by following this link.
                                </p>
                            </div>
                            <div className={cn.icon} style={{ background: "#E5F3DD" }}>
                                <Image src={brain} alt="" />
                            </div>
                        </Link>
                        <Link href="/search" className={cn.card}>
                            <div className={cn.card__text}>
                                <h2>Cases AI</h2>
                                <p>
                                    Description of the section, which will allow you to understand what actions can be performed by following this link.
                                </p>
                            </div>
                            <div className={cn.icon} style={{ background: "#D3EEF2" }}>
                                <Image src={favorite} alt="" />
                            </div>
                        </Link>
                    </div>
                    <div className={cn.row}>
                        <div className={cn.card}>
                            <div className={cn.card__text}>
                                <h2 style={{ fontSize: 24 }}>Document drafting</h2>
                                <p>
                                    Description of the section, which will allow you to understand what actions can be performed by following this link.
                                </p>
                            </div>
                            <div className={cn.icon} style={{ background: "#F2DDF8" }}>
                                <Image src={file} alt="" />
                            </div>
                        </div>
                        <div className={cn.card}>
                            <div className={cn.card__text}>
                                <h2 style={{ fontSize: 24 }}>Services</h2>
                                <p>
                                    Description of the section, which will allow you to understand what actions can be performed by following this link.
                                </p>
                            </div>
                            <div className={cn.icon} style={{ background: "#D9E3FF" }}>
                                <Image src={services} alt="" />
                            </div>
                        </div>
                        <div className={cn.card}>
                            <div className={cn.card__text}>
                                <h2 style={{ fontSize: 24 }}>Feedback support</h2>
                                <p>
                                    Description of the section, which will allow you to understand what actions can be performed by following this link.
                                </p>
                            </div>
                            <div className={cn.icon} style={{ background: "#FDEAD7" }}>
                                <Image src={forum} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cn.footer}>
                <div className={cn.footer__placeholder}>Terms & conditions</div>
                <div className={cn.footer__placeholder}>Privacy notice</div>
                <div className={cn.footer__placeholder}>Cookies-policy</div>
            </div>
        </div>
    )
}
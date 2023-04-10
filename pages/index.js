import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import Logo from "../public/scream-logo.svg";
const obj = {
  cars: {
    title: "Q1",
    children: [
      {
        title: "Tata",
        children: [
          { title: "Nano" },
          { title: "Qatar", children: [{ title: "Nano2" }] },
        ],
      },
    ],
  },
  bikes: {
    title: "Q2",
    children: [{ title: "Tati" }],
  },
};
export default function Home() {
  const [loading, setLoading] = useState(true);

  const objectKeys = Object.keys(obj);

  const pushTitles = (children, titleArray) => {
    children.forEach((child) => {
      if (child.children) {
        pushTitles(child.children, titleArray);
      } else {
        titleArray.push(child.title);
      }
    });
  };

  const [sideBarItems, setSideBarItems] = useState({});

  const getSideBarItems = () => {
    setLoading(true);
    objectKeys.forEach((key) => {
      const titleArray = [];
      if (obj[key].children) {
        pushTitles(obj[key].children, titleArray);
      } else {
        titleArray.push(obj[key].title);
      }
      setSideBarItems((prev) => {
        return { ...prev, [key]: titleArray };
      });
    });
    setLoading(false);
  };

  const [selected, setSelected] = useState();
  const changeSelected = (i) => {
    console.log("selected" + i);
    if (selected === i) {
      setSelected(null);
    } else {
      setSelected(i);
    }
  };
  useEffect(() => {
    setLoading(true);
    getSideBarItems();
    setLoading(false);
  }, []);
  console.log(sideBarItems);
  return (
    <main className={`main ${inter.className}`}>
      <aside className="sidebar">
        <Image className="logo-img" src={Logo} alt="Logo" />
        {!loading ? (
          Object.keys(sideBarItems).map((key) => {
            console.log(key);
            console.log(sideBarItems[key]);
            return (
              <div key={key} className="item-container">
                <div className="item" onClick={() => changeSelected(key)}>
                  <span>{key.toUpperCase()}</span>
                  <span className="icon">+</span>
                </div>
                <div
                  className={selected === key ? "show" : "sub-item-container"}
                >
                  {sideBarItems[key].map((item) => {
                    return (
                      <div key={item} className="sub-item">
                        <span>{"- "+item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </aside>
    </main>
  );
}

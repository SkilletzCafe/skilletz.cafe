import React from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import { MenuData, MenuGroup, MenuItem } from '@/types/menu';

import { BUSINESS, FULL_ADDRESS } from '@/config/business';
import { geist, margarine } from '@/config/fonts';

import { loadMenuData } from '@/utils/menu_static';

interface DinnerPrintProps {
  dinnerMenu: {
    name: string;
    description: string;
    groups: MenuGroup[];
  };
}

const PAGE_WIDTH_IN = 8.5;
const PAGE_HEIGHT_IN = 11;
const DPI = 96;
const PAGE_WIDTH_PX = PAGE_WIDTH_IN * DPI;
const PAGE_HEIGHT_PX = PAGE_HEIGHT_IN * DPI;

// Helper: Assign groups to grid cells by name and order
const GRID_ORDER = [
  ['Appetizers', 'Salads'],
  ['Burgers', "Skillet'z Hand-Cut Steaks"],
  ['Drinks', 'Kids/Niños Menu'],
];

function getGroupByName(groups: MenuGroup[], name: string): MenuGroup | null {
  return groups.find((g) => g.name === name && g.items.length > 0) || null;
}

const DinnerPrint: React.FC<DinnerPrintProps> = ({ dinnerMenu }) => {
  return (
    <>
      <Head>
        <title>Dinner Menu (Printable) | Skillet&#39;z Cafe</title>
        <meta name="robots" content="noindex, nofollow" />
        <style>{`
          @media print {
            html, body {
              width: ${PAGE_WIDTH_IN}in;
              height: ${PAGE_HEIGHT_IN}in;
              margin: 0;
              padding: 0;
              background: #fff !important;
            }
            #print-area {
              border: 1px solid #222;
              margin: 0;
              width: 100vw;
              height: 100vh;
              box-sizing: border-box;
              background: #fff !important;
            }
            .no-print { display: none !important; }
          }
          @media screen {
            html, body {
              background: #f8f8f8;
            }
            #print-area {
              border: 1px solid #222;
              margin: 2rem auto;
              max-width: ${PAGE_WIDTH_PX}px;
              min-height: ${PAGE_HEIGHT_PX}px;
              background: #fff;
              box-shadow: 0 2px 16px rgba(0,0,0,0.08);
              padding: 2rem 2.5rem;
            }
          }
          #print-area {
            font-family: 'Geist', Arial, sans-serif;
            font-size: 0.87rem;
            color: #222;
            line-height: 1.22;
            padding: 1.2rem 1.5rem;
          }
          .menu-title {
            text-align: center;
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            letter-spacing: 0.04em;
          }
          .menu-desc {
            text-align: center;
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
            color: #444;
          }
          .menu-section {
            margin-bottom: 1.2rem;
            page-break-inside: avoid;
          }
          .section-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.2rem;
            border-bottom: 1px solid #bbb;
            padding-bottom: 0.1rem;
            letter-spacing: 0.02em;
          }
          .section-desc {
            font-size: 0.98rem;
            color: #555;
            margin-bottom: 0.3rem;
          }
          .item-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.15rem;
            gap: 1.5rem;
          }
          .item-name {
            font-weight: 500;
            font-size: 1.02rem;
            flex: 1 1 60%;
            margin-right: 0.5rem;
          }
          .item-price {
            font-weight: 500;
            font-size: 1.02rem;
            flex: 0 0 auto;
            min-width: 3.5rem;
            text-align: right;
            white-space: nowrap;
          }
          .item-desc {
            font-size: 0.85rem;
            color: #888;
            margin-left: 0.5rem;
            margin-bottom: 0.1rem;
            font-weight: 400;
          }
          @media print {
            .footer-print-bar {
              border-top: none !important;
            }
            #print-area {
              border: none !important;
            }
          }
        `}</style>
      </Head>
      <div id="print-area" className={geist.className}>
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <img
            src="/images/logos/skilletz_logo_colored_flames.png"
            alt="Skillet'z Cafe Logo"
            style={{
              maxWidth: '180px',
              width: '40vw',
              height: 'auto',
              margin: '0 auto 0.5rem auto',
              display: 'block',
            }}
          />
        </div>
        {dinnerMenu.description && <div className="menu-desc">{dinnerMenu.description}</div>}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto auto',
            columnGap: '2.5rem',
            rowGap: '0.5rem',
            width: '100%',
          }}
        >
          {GRID_ORDER.flat().map((groupName, idx) => {
            const group = getGroupByName(dinnerMenu.groups, groupName);
            if (!group) return <div key={groupName} />;
            return (
              <div className="menu-section" key={group.guid} style={{ breakInside: 'avoid' }}>
                <div className={`section-title ${margarine.className}`}>{group.name}</div>
                {group.description && <div className="section-desc">{group.description}</div>}
                {group.items.map((item) => (
                  <div key={item.guid} style={{ marginBottom: '0.2rem' }}>
                    <div
                      className="item-row"
                      style={{
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '1.5rem',
                      }}
                    >
                      <span className="item-name">{item.name}</span>
                      <span className="item-price" style={{ fontWeight: 700 }}>
                        {Number.isInteger(item.price)
                          ? item.price
                          : item.price.toFixed(2).replace(/\.00$/, '')}
                      </span>
                    </div>
                    {item.description && <div className="item-desc">{item.description}</div>}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: '1.1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.87rem',
            color: '#666',
            borderTop: '1px solid #ddd',
            paddingTop: '0.3rem',
            lineHeight: 1.22,
          }}
          className="footer-print-bar"
        >
          <span style={{ textAlign: 'left', flex: 1 }}>{FULL_ADDRESS}</span>
          <span style={{ textAlign: 'right', flex: 1 }}>
            See menu photos online:{' '}
            <a
              href="https://skilletz.cafe/menu"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#444', textDecoration: 'underline' }}
            >
              skilletz.cafe/menu
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<DinnerPrintProps> = async () => {
  const menuData = loadMenuData();
  const dinnerMenu = menuData.menus.find((m) => m.name === 'Dinner');
  if (!dinnerMenu) {
    return { notFound: true };
  }
  return {
    props: {
      dinnerMenu: {
        name: dinnerMenu.name,
        description: dinnerMenu.description,
        groups: dinnerMenu.groups,
      },
    },
  };
};

export default DinnerPrint;

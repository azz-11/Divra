import { Link } from 'react-router-dom'
import SocialIcons from './SocialIcons.jsx'
import { useLang } from '../i18n.jsx'

const LINKS = [
  { label: 'الرئيسية', to: '/' },
  { label: 'من نحن', to: '/about' },
  { label: 'المنتجات', to: '/products' },
  { label: 'تواصل معنا', to: '/#contact' },
]

export default function Footer() {
  const { t, lp } = useLang()
  return (
    <footer className="border-t border-line bg-surface-2 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-7 px-6 md:flex-row md:justify-between">
        <Link to={lp('/')} className="flex items-center">
          <img src="/logo.png" alt="ديفرا Divra" className="h-9 w-auto" />
        </Link>

        <nav className="flex flex-wrap justify-center gap-6">
          {LINKS.map((l) => (
            <Link key={l.to} to={lp(l.to)} className="text-sm text-text-dim transition-colors hover:text-text">
              {t(l.label)}
            </Link>
          ))}
        </nav>

        <SocialIcons gap="gap-3" />
      </div>
      <p className="mt-8 text-center text-xs text-text-dimmer">
        © {new Date().getFullYear()} ديفرا Divra. {t('جميع الحقوق محفوظة.')}
      </p>
    </footer>
  )
}

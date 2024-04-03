import { CREATOR } from '@/libs/config';
import Button from '../atoms/button';
import Container from '../atoms/container';
import DarkModeToggle from '../atoms/dark-mode-toggle';
import Glass from '../atoms/glass';
import Link from '../atoms/link';
import Shell from '../atoms/shell';
import Strong from '../atoms/strong';

const Header = () => (
  <Glass asChild>
    <header className="sticky top-0 z-10">
      <Container asChild>
        <nav className="navbar md:py-4">
          <span className="flex-1">
            <Link href="/">
              <Shell className="md:text-lg">cd /home/{CREATOR}</Shell>
            </Link>
          </span>
          <span>
            <Button asChild>
              <Strong asChild className="md:text-lg">
                <Link href="/tags">tags</Link>
              </Strong>
            </Button>
            <Button asChild className="btn-square swap swap-rotate">
              <label>
                <DarkModeToggle className="hidden" />
                <i className="i-heroicons-sun-solid swap-on size-6 md:size-7" />
                <i className="i-heroicons-moon-solid swap-off size-6 md:size-7" />
              </label>
            </Button>
          </span>
        </nav>
      </Container>
    </header>
  </Glass>
);

export default Header;

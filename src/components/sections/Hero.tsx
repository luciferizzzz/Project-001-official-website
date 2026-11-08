import { ArrowDown } from 'lucide-react';
import { HERO_META, SITE } from '../../data/site';
import Button from '../ui/Button';
import Emblem from '../ui/Emblem';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__welcome">Welcome to Project 001.</p>

          <h1
            className="hero__title"
            id="hero-title"
            aria-label="Freedom Through Technology."
          >
            <span className="hero__line hero__line--1">Freedom</span>
            <span className="hero__line hero__line--2">
              <em>Through</em>
            </span>
            <span className="hero__line hero__line--3">
              Technology<span className="hero__period">.</span>
            </span>
          </h1>

          <p className="hero__lede">{SITE.description}</p>

          <div className="hero__actions">
            <Button href="#projects" variant="primary" icon="arrow">
              Explore Our Work
            </Button>
            <Button href="#about" variant="quiet" icon="arrow">
              About the collective
            </Button>
          </div>

          <dl className="hero__meta">
            {HERO_META.map((item) => (
              <div className="hero__meta-item" key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__visual">
          <Emblem />
        </div>
      </div>

      <div className="container hero__foot">
        <span>Independent technology collective</span>
        <span className="hero__foot-index" aria-hidden="true">
          001 / Index
        </span>
        <a className="hero__scroll" href="#about">
          Scroll to explore
          <ArrowDown size={14} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

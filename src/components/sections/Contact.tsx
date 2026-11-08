import { CONTACT_CHANNELS } from '../../data/development';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__lead" data-reveal>
          <p className="eyebrow">
            <span className="eyebrow__index">05</span>
            <span aria-hidden="true">/</span>
            <span>Contact</span>
          </p>

          <h2 className="contact__title" id="contact-title">
            Official <em>channels</em>.
          </h2>

          <p className="contact__lede">
            Project 001 does not yet publish official contact details. This
            section is reserved for verified addresses and destinations once
            they are confirmed.
          </p>

          <p className="contact__note">
            No unverified email addresses, social accounts, or external links
            are published on this site.
          </p>
        </div>

        <div className="contact__panel" data-reveal>
          <span
            className="contact__corner contact__corner--tl"
            aria-hidden="true"
          />
          <span
            className="contact__corner contact__corner--br"
            aria-hidden="true"
          />

          <p className="contact__panel-label">Communication status</p>
          <p className="contact__panel-value">Pending publication</p>

          <dl className="contact__channels">
            {CONTACT_CHANNELS.map((channel) => (
              <div className="contact__channel" key={channel.label}>
                <dt>{channel.label}</dt>
                <dd>{channel.value}</dd>
              </div>
            ))}
          </dl>

          <p className="contact__panel-note">
            Channels will be listed only after they are officially confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}

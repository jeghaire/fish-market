export default function BrandsMarquee() {
  return (
    <div className="marquee__wrapper">
      <div className="marquee">
        {[
          {
            text: 'Meet The Dream Family, three tailored looks, one oh-so-soft fabric.',
            ctaText: 'Shop now',
            bgColor: '#baa790',
            ctaLink: 'collections/black-friday-special'
          },
          {
            text: 'New summer sets are here. Mix, match, and fly somewhere sunny.',
            ctaText: 'Shop now',
            bgColor: '#d4c6b8',
            ctaLink: 'collections/summer-sets'
          },
          {
            text: 'Get early access on launches and offers.',
            ctaText: 'Sign up for texts',
            bgColor: '#00000',
            ctaLink: '/subscribe#sms'
          },
          {
            text: 'The Vacation Shop Is Open: Discover elevated essentials for every destination this summer.',
            ctaText: 'Shop now',
            bgColor: '#9fa393',
            ctaLink: 'collections/vacation-picks'
          }
        ].map((t) => (
          <p key={t.ctaLink} className="mx-10">
            {t.text}
          </p>
        ))}
      </div>
    </div>
  );
}

const benefits = [
  'Fast and Free Shipping',
  '24/7 Customer Support',
  'Seamless Shopping Experience',
  'Quality Assurance',
  'Easy Returns'
]

export default function WhySnapshop() {
  return (
    <section className='bg-accent p-8 rounded-3xl'>
      <h4 className='text-lg md:text-xl font-bold mt-2'>Why Snapshop?</h4>
      <ul className='mt-5 list-disc leading-7 list-inside'>
        {benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
    </section>
  )
}

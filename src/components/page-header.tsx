export default function PageHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <section className="py-12 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h1>
          <p className="mt-4 text-gray-500 md:text-xl/relaxed">{description}</p>
        </div>
      </div>
    </section>
  )
}

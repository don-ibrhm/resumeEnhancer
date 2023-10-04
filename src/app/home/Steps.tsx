const STEPS = [
  { title: "Upload your Resume", text: "or create one from scratch." },
  { title: "Optimize your CV with AI", text: "then preview and fine-tune changes." },
  { title: "Export as pdf", text: "and apply with confidence." },
];

export const Steps = () => {
  return (
    <section className="mx-auto mt-8 rounded-2xl bg-orange-50 bg-dot px-8 pb-12 pt-10 lg:mt-2">
      <h1 className="text-center text-3xl font-bold">Transform your Resume with AI in <span className="text-primary">THREE</span> simple steps</h1>
      <div className="mt-8 flex justify-center">
        <dl className="flex flex-col gap-y-10 lg:flex-row lg:justify-center lg:gap-x-20">
          {STEPS.map(({ title, text }, idx) => (
            <div className="relative self-start pl-14" key={idx}>
              <dt className="text-lg font-bold">
                <div className="bg-primary absolute left-0 top-1 flex h-10 w-10 select-none items-center justify-center rounded-full p-[3.5px] opacity-80">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                    <div className="text-primary -mt-0.5 text-2xl">
                      {idx + 1}
                    </div>
                  </div>
                </div>
                {title}
              </dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

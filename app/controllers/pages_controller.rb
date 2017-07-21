class PagesController < ApplicationController
  def home
    @features = [
        {
          title: "Web developer",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam officiis nemo eos, ipsum culpa, necessitatibus expedita voluptas libero accusamus ipsa, earum aliquam velit. Amet, nobis, iusto? Ratione vero, harum voluptas!",
          icon: "fa fa-code"
        },
        {
          title: "Teacher",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam officiis nemo eos, ipsum culpa, necessitatibus expedita voluptas libero accusamus ipsa, earum aliquam velit. Amet, nobis, iusto? Ratione vero, harum voluptas!",
          icon: "fa fa-graduation-cap"
        },
        {
          title: "Business developer",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam officiis nemo eos, ipsum culpa, necessitatibus expedita voluptas libero accusamus ipsa, earum aliquam velit. Amet, nobis, iusto? Ratione vero, harum voluptas!",
          icon: "fa fa-usd"
        }
      ]
  end
end

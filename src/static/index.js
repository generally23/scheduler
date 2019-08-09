// UTILITY FUNCTIONS
const $ = selector => document.querySelector(selector);
const clearInputs = elements =>
  elements.forEach(element => {
    element.value = "";
  });

const app = {
  UI: {
    getInput() {
      return {
        date: $(".date").value,
        time: $(".time").value,
        activity: $(".activity").value
      };
    },
    render({ time, date, activity }, element) {
      const html = `
            <tr>
              <td>${time}</td>
              <td>${date}</td>
              <td>${activity}</td>
            </tr >
        `;
      element.insertAdjacentHTML("beforeend", html);
    }
  },
  store: {
    scheduleList: [],
    add(value) {
      return this.scheduleList.push(value);
    },
    remove() {
      return this.scheduleList.pop();
    }
  },
  handleApp() {
    // listen for user submission
    $("form").addEventListener("submit", e => {
      // stop form submission
      e.preventDefault();
      // get the values
      const schedule = this.UI.getInput();
      for (let key in schedule) {
        $(".error").innerText = "You cannot have an empty schedule";
        if (!schedule[key]) return;
      }
      $(".error").innerText = "";
      // clear the inputs
      clearInputs([$(".time"), $(".date"), $(".activity")]);
      // generate an id for the schedule
      const list = this.store.scheduleList;
      schedule.id = list[list.length - 1] ? list[list.length - 1].id + 1 : 0;
      // store them into our store
      this.store.add(schedule);
      // render recent schedules to the UI
      this.UI.render(schedule, $("tbody"));
    });
  }
};

app.handleApp();

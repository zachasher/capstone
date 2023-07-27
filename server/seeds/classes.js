/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('classes').del();
    await knex('classes').insert([
      {
        id: 1,
        class_name: "Cardio",
        instructor: "Jessica Smith",
        description: "High-intensity cardio workout to burn calories and improve cardiovascular endurance.",
        day: "Mon",
        time: "7AM"
      },
      {
        id: 2,
        class_name: "Strength Training",
        instructor: "John Doe",
        description: "Full-body strength training using free weights and resistance exercises.",
        day: "Tue",
        time: "8AM"
      },
      {
        id: 3,
        class_name: "Yoga",
        instructor: "Emily Johnson",
        description: "Gentle yoga flow to improve flexibility, balance, and reduce stress.",
        day: "Wed",
        time: "12PM"
      },
      {
        id: 4,
        class_name: "HIIT",
        instructor: "Mike Anderson",
        description: "High-Intensity Interval Training (HIIT) with a combination of bodyweight and equipment exercises.",
        day: "Thu",
        time: "5PM"
      },
      {
        id: 5,
        class_name: "Pilates",
        instructor: "Sophia Lee",
        description: "Pilates class focused on core strengthening and flexibility.",
        day: "Fri",
        time: "8AM"
      },
      {
        id: 6,
        class_name: "Zumba",
        instructor: "Carlos Ramirez",
        description: "Latin-inspired dance fitness party to move and groove.",
        day: "Sat",
        time: "8AM"
      },
      {
        id: 7,
        class_name: "Spin Cycling",
        instructor: "Alex Turner",
        description: "Indoor cycling class for a high-energy, calorie-burning workout.",
        day: "Sun",
        time: "12PM"
      },
      {
        id: 8,
        class_name: "Bootcamp",
        instructor: "Laura Roberts",
        description: "Intense bootcamp-style workout with a mix of cardio and strength exercises.",
        day: "Mon",
        time: "8AM"
      },
      {
        id: 9,
        class_name: "Barre",
        instructor: "Melissa Davis",
        description: "Combination of ballet, Pilates, and yoga for a full-body sculpting workout.",
        day: "Thu",
        time: "6PM"
      },
      {
        id: 10,
        class_name: "Meditation",
        instructor: "Amanda Thompson",
        description: "Guided meditation class to relax the mind and reduce stress.",
        day: "Sun",
        time: "8AM"
      }
    ]);
  };
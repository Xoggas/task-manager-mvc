class TaskDto {
  constructor(req) {
    this.name = req.body.name;
    this.description = req.body.description;
    this.dueDay = req.body.dueDay;
  }
}
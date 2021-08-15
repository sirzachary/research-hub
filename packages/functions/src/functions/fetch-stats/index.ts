import { handlerPath } from "@libs/handlerResolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            schedule: { name: 'fitbit-polling-schedule', rate: 'rate(5 minutes)' }
        }
    ]
}

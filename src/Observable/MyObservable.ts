type VoidFunction = () => void
const voidFunction: VoidFunction = () => {}

type TSubscriber<T> = {
    next: (value: T) => void,
    error?: (error: any) => void,
    complete?: VoidFunction,
}

type TSubscriberFunction<T> = (subscriber: Required<TSubscriber<T>>) => VoidFunction | void

class MyObservable<T> {
    private _subscribers = new Map()
    private _subscriberFunction: TSubscriberFunction<T>

    constructor(subscriberFunction: TSubscriberFunction<T>) {
        this._subscriberFunction = subscriberFunction
    }

    subscribe = (subscriber: TSubscriber<T> | ((value: T) => void)) => {this
        const subscriberId = Symbol()

        if (typeof subscriber === "function") {
            this._subscribers.set(subscriberId, {
                next: subscriber,
                complete: voidFunction,
                error: voidFunction
            })
        } else {
            this._subscribers.set(subscriberId, {
                next: subscriber.next,
                complete: subscriber.complete ?? voidFunction,
                error: subscriber.error ?? voidFunction
            })
        }

        const activeSubscriber = this._subscribers.get(subscriberId)
        const cleanUp  = this._subscriberFunction(activeSubscriber)

        return {
            unsubscribe: () => {
                if (activeSubscriber.complete) {
                    activeSubscriber.complete();
                }
                cleanUp && cleanUp()
                this._subscribers.delete(subscriberId)
            }
        }
    }
}

export {MyObservable};

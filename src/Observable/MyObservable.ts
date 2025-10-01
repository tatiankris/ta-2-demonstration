type VoidFunction = () => void

type TSubscriber<T> = {
    next: (value: T) => void,
    error?: (error: any) => void,
    complete?: VoidFunction,
}

type TSubscriberFunction<T> = (subscriber: Required<TSubscriber<T>>) => VoidFunction | void

class SafeSubscriber<T> {
    closed = false;
    private _destination: TSubscriber<T>
    constructor(subscriber: TSubscriber<T>) {
        this._destination = subscriber
    }

    next(value: T) {
        if (!this.closed) {
            this._destination.next(value);
        }
    }

    complete() {
        if (!this.closed) {
            this.closed = true;
            if (this._destination.complete) {
                this._destination.complete();
                return
            }
            console.log("Complete")
        }
    }

    error(error) {
        if (!this.closed) {
            this.closed = true;
            if (this._destination.error) {
                this._destination.error(error);
                return
            }
            console.log("Error:", error)
        }
    }
}

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
            })
        } else {
            this._subscribers.set(subscriberId, {
                next: subscriber.next,
                complete: subscriber.complete,
                error: subscriber.error
            })
        }

        const activeSubscriber = new SafeSubscriber(this._subscribers.get(subscriberId))
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

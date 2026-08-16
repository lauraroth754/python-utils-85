type ServiceCallback = (data: any) => void;

class Service {
    private callbacks: ServiceCallback[] = [];

    public registerCallback(callback: ServiceCallback): void {
        this.callbacks.push(callback);
    }

    public notify(data: any): void {
        for (const callback of this.callbacks) {
            callback(data);
        }
    }

    public clearCallbacks(): void {
        this.callbacks = [];
    }
}

export default Service;

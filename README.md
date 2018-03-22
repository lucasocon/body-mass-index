### Initial Setup

Just run the self-setup script

```
chmod u+x run/setup
run/setup
```


### Scripts

The project is using Ruby 2.4.1:

```
    rvm install ruby-2.4.1

```

This repository comes equipped with a self-setup script:

```
    chmod u+x run/setup
    run/setup
```

Make sure bundle is up to date:

```
    bundle install
```

To start your web server:

```
    chmod u+x run/setup
    bin/server
```

If you want to be able to use `binding.pry` with your server, you must run the processes within Procfile in different terminal windows/tabs/processes (`bin/server` uses `foreman`, which doesn't play nice with `pry`)
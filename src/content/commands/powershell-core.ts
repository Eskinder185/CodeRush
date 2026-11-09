import { define, ps } from './helpers'

const CORE = 'Microsoft.PowerShell.Core'
const MGMT = 'Microsoft.PowerShell.Management'
const UTIL = 'Microsoft.PowerShell.Utility'

/** PowerShell foundations: help, discovery, files, pipelines, objects, variables, scripting, automation. */
export const powershellCore = define('powershell', [
  // ---------------- Introduction ----------------
  {
    id: 'ps.psversiontable',
    command: '$PSVersionTable',
    title: 'Check the PowerShell version',
    category: 'fundamentals',
    subcategory: 'Introduction',
    difficulty: 'beginner',
    objective: 'Find out which PowerShell edition and version you are running.',
    summary: 'Prints a table describing the running PowerShell: version, edition, and platform.',
    details: 'PSEdition "Desktop" is Windows PowerShell 5.1, built into Windows. "Core" is PowerShell 7 or later, installed separately and cross-platform. Some cmdlets exist only in one of them.',
    whenToUse: 'Before following a guide, because syntax and available cmdlets differ between 5.1 and 7.',
    syntax: [{ token: '$PSVersionTable', meaning: 'automatic variable describing the running engine' }],
    sampleOutput: `Name                           Value
----                           -----
PSVersion                      7.4.6
PSEdition                      Core
GitCommitId                    7.4.6
OS                             Microsoft Windows 10.0.22631
Platform                       Win32NT
PSCompatibleVersions           {1.0, 2.0, 3.0, 4.0…}`,
    mistakes: ['Typing $PSVersion, which is not a variable.'],
    requirements: 'All PowerShell versions.',
    recallPrompt: 'Show the version and edition of the running PowerShell.',
    accepted: ['$PSVersionTable.PSVersion'],
    related: ['ps.get-host'],
    keywords: ['powershell version', 'which powershell'],
    source: { label: 'about_Automatic_Variables on Microsoft Learn', url: 'https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_automatic_variables' },
  },
  {
    id: 'ps.get-host',
    command: 'Get-Host',
    title: 'Inspect the host program',
    category: 'fundamentals',
    subcategory: 'Introduction',
    difficulty: 'beginner',
    objective: 'Identify the program hosting PowerShell, such as a console or VS Code.',
    summary: 'Returns details about the host application, including its name, version, and culture.',
    whenToUse: 'When a script behaves differently in the console and in an editor.',
    syntax: [{ token: 'Get-Host', meaning: 'cmdlet: get the current host object' }],
    sampleOutput: `Name             : ConsoleHost
Version          : 7.4.6
InstanceId       : 5b2c3e1a-8f44-4d0e-9a7b-2c6d1e0f9a11
CurrentCulture   : en-US
CurrentUICulture : en-US`,
    mistakes: ['Reading the host version as the engine version. Use $PSVersionTable for that.'],
    recallPrompt: 'Show information about the program that is hosting PowerShell.',
    related: ['ps.psversiontable'],
    keywords: ['host', 'console'],
    source: ps(UTIL, 'Get-Host'),
  },

  // ---------------- Cmdlets ----------------
  {
    id: 'ps.get-verb',
    command: 'Get-Verb',
    title: 'List approved verbs',
    category: 'fundamentals',
    subcategory: 'Understanding cmdlets',
    difficulty: 'beginner',
    objective: 'Understand the Verb-Noun naming pattern behind every cmdlet.',
    summary: 'Lists the approved verbs, such as Get, Set, New, and Remove, with their groups.',
    details: 'Every cmdlet is named Verb-Noun. Get only reads. Set changes. New creates. Remove deletes. Knowing this lets you guess names: if Get-Service exists, Restart-Service probably does too.',
    whenToUse: 'When naming your own functions, or guessing the name of a cmdlet.',
    syntax: [{ token: 'Get-Verb', meaning: 'list approved verbs' }],
    sampleOutput: `Verb        AliasPrefix Group          Description
----        ----------- -----          -----------
Add         a           Common         Adds a resource to a container…
Clear       cl          Common         Removes all the resources from a container…
Get         g           Common         Specifies an action that retrieves a resource
New         n           Common         Creates a resource
Remove      r           Common         Deletes a resource from a container
Set         s           Common         Replaces data on an existing resource…`,
    mistakes: ['Assuming any Get- cmdlet can change things. Get verbs should only read.'],
    recallPrompt: 'List the approved PowerShell verbs.',
    related: ['ps.get-command-noun'],
    keywords: ['verbs', 'naming', 'verb-noun'],
    source: ps(UTIL, 'Get-Verb'),
  },
  {
    id: 'ps.get-date',
    command: 'Get-Date',
    title: 'Get the current date and time',
    category: 'system',
    subcategory: 'Understanding cmdlets',
    difficulty: 'beginner',
    objective: 'Run a simple cmdlet and see that it returns an object, not just text.',
    summary: 'Returns the current date and time as a DateTime object.',
    details: 'The output looks like text, but it is an object with properties such as Year, DayOfWeek, and Hour. Try (Get-Date).DayOfWeek.',
    whenToUse: 'When you need timestamps for logs, file names, or time comparisons.',
    syntax: [{ token: 'Get-Date', meaning: 'return the current date and time' }],
    sampleOutput: 'Tuesday, March 3, 2026 9:24:51 AM',
    mistakes: ['Formatting dates by hand. Use Get-Date -Format "yyyy-MM-dd" instead.'],
    recallPrompt: 'Get the current date and time.',
    related: ['ps.get-member'],
    keywords: ['date', 'time', 'timestamp'],
    source: ps(UTIL, 'Get-Date'),
  },

  // ---------------- Getting help ----------------
  {
    id: 'ps.get-help',
    command: 'Get-Help Get-Process',
    title: 'Read help for a cmdlet',
    category: 'fundamentals',
    subcategory: 'Getting help',
    difficulty: 'beginner',
    objective: 'Read the syntax and description of any cmdlet.',
    summary: 'Shows the help topic for Get-Process: synopsis, syntax, and description.',
    whenToUse: 'Whenever you meet a new cmdlet.',
    notice: 'Square brackets in SYNTAX mark optional parameters. <string[]> means the parameter accepts several strings.',
    syntax: [
      { token: 'Get-Help', meaning: 'display help' },
      { token: 'Get-Process', meaning: 'the cmdlet to describe' },
    ],
    sampleOutput: `NAME
    Get-Process

SYNOPSIS
    Gets the processes that are running on the local computer.

SYNTAX
    Get-Process [[-Name] <string[]>] [-Module] [-FileVersionInfo] [<CommonParameters>]
    Get-Process -Id <int[]> [-Module] [-FileVersionInfo] [<CommonParameters>]`,
    mistakes: ['Skipping help because local help is not installed. Add -Online to open the web version.'],
    recallPrompt: 'Show the help topic for Get-Process.',
    accepted: ['help Get-Process', 'Get-Help -Name Get-Process'],
    related: ['ps.get-help-examples', 'ps.update-help'],
    keywords: ['help', 'documentation', 'man powershell'],
    source: ps(CORE, 'Get-Help'),
  },
  {
    id: 'ps.get-help-examples',
    command: 'Get-Help Get-Service -Examples',
    title: 'Show only usage examples',
    category: 'fundamentals',
    subcategory: 'Getting help',
    difficulty: 'beginner',
    objective: 'Jump straight to worked examples of a cmdlet.',
    summary: 'Prints only the example section of the Get-Service help topic.',
    whenToUse: 'When you learn faster from examples than from syntax diagrams.',
    syntax: [
      { token: 'Get-Help Get-Service', meaning: 'help for Get-Service' },
      { token: '-Examples', meaning: 'only the examples' },
    ],
    sampleOutput: `    ----------- Example 1: Get all services on the computer -----------
    Get-Service

    ------ Example 2: Get services that begin with a search string ------
    Get-Service "wmi*"`,
    mistakes: ['Writing -Example. The parameter name is plural.'],
    recallPrompt: 'Show just the usage examples from the Get-Service help topic.',
    accepted: ['help Get-Service -Examples'],
    related: ['ps.get-help'],
    keywords: ['examples'],
    source: ps(CORE, 'Get-Help'),
  },
  {
    id: 'ps.update-help',
    command: 'Update-Help -UICulture en-US',
    title: 'Download local help files',
    category: 'fundamentals',
    subcategory: 'Getting help',
    difficulty: 'beginner',
    objective: 'Install full help content so Get-Help works offline.',
    summary: 'Downloads the latest English help files for installed modules.',
    whenToUse: 'On a new machine, when Get-Help shows only auto-generated syntax.',
    syntax: [
      { token: 'Update-Help', meaning: 'download help files' },
      { token: '-UICulture en-US', meaning: 'language of the help' },
    ],
    sampleOutput: '',
    mistakes: ['Expecting it to succeed for every module. Some modules publish no updatable help, and errors for those are normal.'],
    permissions: 'elevated',
    safety: 'changes-state',
    requirements: 'Windows PowerShell 5.1 needs an elevated session. PowerShell 7 can use -Scope CurrentUser. Requires internet access.',
    recallPrompt: 'Download the latest English help files.',
    accepted: ['Update-Help', 'Update-Help -Scope CurrentUser'],
    related: ['ps.get-help'],
    keywords: ['update help'],
    source: ps(CORE, 'Update-Help'),
  },

  // ---------------- Exploring commands ----------------
  {
    id: 'ps.get-command-noun',
    command: 'Get-Command -Noun Service',
    title: 'Find cmdlets by noun',
    category: 'fundamentals',
    subcategory: 'Exploring commands',
    difficulty: 'beginner',
    objective: 'Discover every cmdlet that works with a given kind of object.',
    summary: 'Lists every command whose noun is Service, such as Get-Service and Restart-Service.',
    whenToUse: 'When you know what you want to work with but not the exact cmdlet.',
    syntax: [
      { token: 'Get-Command', meaning: 'find commands' },
      { token: '-Noun Service', meaning: 'match on the noun part' },
    ],
    sampleOutput: `CommandType     Name                Version    Source
-----------     ----                -------    ------
Cmdlet          Get-Service         7.0.0.0    Microsoft.PowerShell.Management
Cmdlet          New-Service         7.0.0.0    Microsoft.PowerShell.Management
Cmdlet          Restart-Service     7.0.0.0    Microsoft.PowerShell.Management
Cmdlet          Start-Service       7.0.0.0    Microsoft.PowerShell.Management
Cmdlet          Stop-Service        7.0.0.0    Microsoft.PowerShell.Management`,
    mistakes: ['Searching with -Name Service, which only finds a command literally named Service.'],
    recallPrompt: 'List every cmdlet whose noun is Service.',
    related: ['ps.get-command-wildcard', 'ps.get-verb'],
    keywords: ['find cmdlet', 'discover commands'],
    source: ps(CORE, 'Get-Command'),
  },
  {
    id: 'ps.get-command-wildcard',
    command: 'Get-Command *dns*',
    title: 'Search commands with a wildcard',
    category: 'fundamentals',
    subcategory: 'Exploring commands',
    difficulty: 'beginner',
    objective: 'Find commands when you only know part of the name.',
    summary: 'Lists every command, function, and alias with "dns" anywhere in its name.',
    whenToUse: 'When exploring what a module offers.',
    syntax: [
      { token: 'Get-Command', meaning: 'find commands' },
      { token: '*dns*', meaning: 'wildcard pattern' },
    ],
    sampleOutput: `CommandType     Name                          Version    Source
-----------     ----                          -------    ------
Function        Clear-DnsClientCache          1.0.0.0    DnsClient
Function        Get-DnsClientCache            1.0.0.0    DnsClient
Function        Get-DnsClientServerAddress    1.0.0.0    DnsClient
Cmdlet          Resolve-DnsName               1.0.0.0    DnsClient`,
    mistakes: ['Forgetting the asterisks and finding nothing.'],
    recallPrompt: 'Find every command with "dns" anywhere in its name.',
    accepted: ['Get-Command -Name *dns*', 'gcm *dns*'],
    related: ['ps.get-command-noun', 'ps.get-alias'],
    keywords: ['search commands', 'wildcard'],
    source: ps(CORE, 'Get-Command'),
  },
  {
    id: 'ps.get-alias',
    command: 'Get-Alias ls',
    title: 'Resolve an alias',
    category: 'fundamentals',
    subcategory: 'Exploring commands',
    difficulty: 'beginner',
    objective: 'Find out which cmdlet a short alias runs.',
    summary: 'Shows that ls is an alias for Get-ChildItem.',
    details: 'Aliases such as ls, dir, cat, and ps exist for convenience. In scripts, write the full cmdlet name so others can read it. On Linux and macOS, PowerShell 7 does not define ls as an alias, so ls runs the native program.',
    whenToUse: 'When reading someone else\'s script full of short aliases.',
    syntax: [
      { token: 'Get-Alias', meaning: 'list or look up aliases' },
      { token: 'ls', meaning: 'alias to resolve' },
    ],
    sampleOutput: `CommandType     Name                      Version    Source
-----------     ----                      -------    ------
Alias           ls -> Get-ChildItem`,
    mistakes: ['Assuming Linux flags work. "ls -la" fails in PowerShell on Windows because Get-ChildItem has no -la parameter.'],
    recallPrompt: 'Find out which cmdlet the ls alias points to.',
    accepted: ['Get-Alias -Name ls'],
    related: ['ps.get-childitem'],
    keywords: ['alias', 'shortcut'],
    source: ps(UTIL, 'Get-Alias'),
  },

  // ---------------- Files and directories ----------------
  {
    id: 'ps.get-location',
    command: 'Get-Location',
    title: 'Show the current location',
    category: 'files',
    subcategory: 'Files and directories',
    difficulty: 'beginner',
    objective: 'Find which folder your session is in.',
    summary: 'Returns the current working location, the PowerShell equivalent of pwd.',
    whenToUse: 'Before using relative paths such as .\\file.txt.',
    syntax: [{ token: 'Get-Location', meaning: 'return the current location' }],
    sampleOutput: `Path
----
C:\\Labs`,
    mistakes: ['Assuming the location is the script folder. Use $PSScriptRoot inside scripts.'],
    recallPrompt: 'Show the folder your PowerShell session is currently in.',
    accepted: ['pwd', 'gl'],
    related: ['ps.set-location', 'ps.get-childitem'],
    keywords: ['current directory', 'pwd powershell'],
    source: ps(MGMT, 'Get-Location'),
  },
  {
    id: 'ps.set-location',
    command: 'Set-Location C:\\Labs\\Logs',
    title: 'Change location',
    category: 'files',
    subcategory: 'Files and directories',
    difficulty: 'beginner',
    objective: 'Move to another folder.',
    summary: 'Changes the current location to C:\\Labs\\Logs.',
    whenToUse: 'When you will work with several files in one folder.',
    syntax: [
      { token: 'Set-Location', meaning: 'change location; alias cd' },
      { token: 'C:\\Labs\\Logs', meaning: 'path; quote it if it contains spaces' },
    ],
    sampleOutput: '',
    mistakes: ['Not quoting paths with spaces, such as "C:\\Program Files".'],
    recallPrompt: 'Move to the folder C:\\Labs\\Logs.',
    accepted: ['cd C:\\Labs\\Logs', "Set-Location -Path 'C:\\Labs\\Logs'", 'Set-Location -Path C:\\Labs\\Logs'],
    related: ['ps.get-location'],
    keywords: ['change directory', 'cd powershell'],
    source: ps(MGMT, 'Set-Location'),
  },
  {
    id: 'ps.get-childitem',
    command: 'Get-ChildItem',
    title: 'List folder contents',
    category: 'files',
    subcategory: 'Files and directories',
    difficulty: 'beginner',
    objective: 'List files and folders in the current location.',
    summary: 'Lists items in the current folder with their mode, last write time, size, and name.',
    whenToUse: 'Whenever you need to see what is in a folder.',
    notice: 'In the Mode column, d means directory, a means archive, h means hidden.',
    syntax: [{ token: 'Get-ChildItem', meaning: 'list child items; aliases ls, dir, gci' }],
    sampleOutput: `    Directory: C:\\Labs

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----          03/02/2026    17:45                Logs
d----          03/02/2026    17:45                Reports
-a---          03/03/2026    08:55           1180 sample.txt
-a---          03/03/2026    09:02            412 config.json`,
    mistakes: ['Expecting hidden files. Add -Force to include them.'],
    recallPrompt: 'List the files and folders in the current location.',
    accepted: ['ls', 'dir', 'gci'],
    related: ['ps.get-childitem-recurse', 'ps.get-location'],
    keywords: ['list files', 'dir', 'ls powershell'],
    source: ps(MGMT, 'Get-ChildItem'),
  },
  {
    id: 'ps.get-childitem-recurse',
    command: 'Get-ChildItem -Path C:\\Labs -Recurse -Filter *.log',
    title: 'Find files recursively',
    category: 'files',
    subcategory: 'Files and directories',
    difficulty: 'intermediate',
    objective: 'Search a folder tree for files that match a pattern.',
    summary: 'Searches C:\\Labs and every subfolder for files ending in .log.',
    whenToUse: 'When you need every log or config file under a folder.',
    syntax: [
      { token: '-Path C:\\Labs', meaning: 'where to start' },
      { token: '-Recurse', meaning: 'include all subfolders' },
      { token: '-Filter *.log', meaning: 'fast, provider-level name filter' },
    ],
    sampleOutput: `    Directory: C:\\Labs\\Logs

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---          03/03/2026    09:15          48210 app.log
-a---          03/03/2026    09:15           2210 error.log`,
    mistakes: ['Using -Include without -Recurse or a wildcard path, which returns nothing.'],
    recallPrompt: 'Find every .log file under C:\\Labs, including subfolders.',
    accepted: ['Get-ChildItem C:\\Labs -Recurse -Filter *.log', 'Get-ChildItem -Path C:\\Labs -Filter *.log -Recurse', 'gci C:\\Labs -Recurse -Filter *.log'],
    related: ['ps.get-childitem', 'ps.measure-object-sum'],
    keywords: ['find files', 'search files', 'recursive'],
    source: ps(MGMT, 'Get-ChildItem'),
  },
  {
    id: 'ps.new-item-directory',
    command: 'New-Item -ItemType Directory -Path .\\Reports',
    title: 'Create a folder',
    category: 'files',
    subcategory: 'Files and directories',
    difficulty: 'beginner',
    objective: 'Create a new directory.',
    summary: 'Creates a folder named Reports in the current location.',
    whenToUse: 'When a script needs an output folder.',
    syntax: [
      { token: 'New-Item', meaning: 'create an item' },
      { token: '-ItemType Directory', meaning: 'make a folder, not a file' },
      { token: '-Path .\\Reports', meaning: 'where to create it' },
    ],
    sampleOutput: `    Directory: C:\\Labs

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----          03/03/2026    09:30                Reports`,
    mistakes: ['Forgetting -ItemType, which prompts for the type.'],
    safety: 'changes-state',
    recallPrompt: 'Create a folder named Reports in the current location.',
    accepted: ['New-Item -Path .\\Reports -ItemType Directory', 'mkdir Reports', 'mkdir .\\Reports'],
    related: ['ps.copy-item', 'ps.test-path'],
    keywords: ['create folder', 'mkdir powershell'],
    source: ps(MGMT, 'New-Item'),
  },
  {
    id: 'ps.copy-item',
    command: 'Copy-Item .\\config.json .\\config.bak.json',
    title: 'Copy a file',
    category: 'files',
    subcategory: 'Files and directories',
    difficulty: 'beginner',
    objective: 'Make a backup before editing a file.',
    summary: 'Copies config.json to config.bak.json in the same folder.',
    whenToUse: 'Before changing any configuration file.',
    syntax: [
      { token: 'Copy-Item', meaning: 'copy; aliases copy, cp' },
      { token: '.\\config.json', meaning: 'source' },
      { token: '.\\config.bak.json', meaning: 'destination' },
    ],
    sampleOutput: '',
    mistakes: ['Copying folders without -Recurse, which copies only the empty folder.'],
    safety: 'changes-state',
    recallPrompt: 'Back up config.json to config.bak.json.',
    accepted: ['Copy-Item -Path .\\config.json -Destination .\\config.bak.json', 'Copy-Item config.json config.bak.json'],
    related: ['ps.remove-item-whatif'],
    keywords: ['copy file', 'backup'],
    source: ps(MGMT, 'Copy-Item'),
  },
  {
    id: 'ps.remove-item-whatif',
    command: 'Remove-Item .\\old-reports -Recurse -WhatIf',
    title: 'Preview a deletion with -WhatIf',
    category: 'files',
    subcategory: 'Files and directories',
    difficulty: 'intermediate',
    objective: 'See what a destructive command would do before running it.',
    summary: 'Reports what Remove-Item would delete, without deleting anything.',
    details: '-WhatIf is supported by most cmdlets that change things. -Confirm asks before each change. Make -WhatIf a habit for anything recursive.',
    whenToUse: 'Before any delete, move, or bulk change.',
    syntax: [
      { token: 'Remove-Item', meaning: 'delete items' },
      { token: '.\\old-reports', meaning: 'target' },
      { token: '-Recurse', meaning: 'include contents' },
      { token: '-WhatIf', meaning: 'simulate only' },
    ],
    sampleOutput: 'What if: Performing the operation "Remove Directory" on target "C:\\Labs\\old-reports".',
    mistakes: ['Removing -WhatIf without re-reading the target path.'],
    recallPrompt: 'Preview what deleting the old-reports folder and its contents would do, without deleting anything.',
    accepted: ['Remove-Item -Path .\\old-reports -Recurse -WhatIf', 'Remove-Item .\\old-reports -WhatIf -Recurse'],
    related: ['ps.copy-item'],
    keywords: ['whatif', 'dry run', 'safe delete'],
    source: ps(MGMT, 'Remove-Item'),
  },
  {
    id: 'ps.get-content-tail',
    command: 'Get-Content .\\app.log -Tail 20',
    title: 'Read the end of a file',
    category: 'text',
    subcategory: 'Files and directories',
    difficulty: 'beginner',
    objective: 'Show the most recent lines of a log file.',
    summary: 'Prints the last 20 lines of app.log.',
    whenToUse: 'When checking the latest log entries after an error.',
    notice: 'Add -Wait to keep reading new lines as they are written, like tail -f.',
    syntax: [
      { token: 'Get-Content', meaning: 'read file contents; aliases cat, gc' },
      { token: '.\\app.log', meaning: 'file' },
      { token: '-Tail 20', meaning: 'last 20 lines' },
    ],
    sampleOutput: `2026-03-03 09:15:10 ERROR db: connection refused (host=10.0.2.15 port=5432)
2026-03-03 09:15:11 WARN  retrying in 5s
2026-03-03 09:15:16 ERROR db: connection refused (host=10.0.2.15 port=5432)`,
    mistakes: ['Reading a huge file without -Tail or -TotalCount.'],
    recallPrompt: 'Show the last 20 lines of app.log.',
    accepted: ['Get-Content -Path .\\app.log -Tail 20', 'Get-Content app.log -Tail 20', 'gc .\\app.log -Tail 20'],
    related: ['ps.select-string'],
    keywords: ['tail', 'read log', 'last lines'],
    source: ps(MGMT, 'Get-Content'),
  },
  {
    id: 'ps.test-path',
    command: 'Test-Path .\\config.json',
    title: 'Check that a path exists',
    category: 'files',
    subcategory: 'Files and directories',
    difficulty: 'beginner',
    objective: 'Get True or False for whether a file or folder exists.',
    summary: 'Returns True if config.json exists in the current location, otherwise False.',
    whenToUse: 'In scripts, before reading a file or creating one.',
    syntax: [
      { token: 'Test-Path', meaning: 'test whether a path exists' },
      { token: '.\\config.json', meaning: 'path to test' },
    ],
    sampleOutput: 'True',
    mistakes: ['Testing a relative path from a script without knowing the current location.'],
    recallPrompt: 'Check whether config.json exists in the current folder.',
    accepted: ['Test-Path -Path .\\config.json', 'Test-Path config.json'],
    related: ['ps.if-test-path'],
    keywords: ['file exists', 'path exists'],
    source: ps(MGMT, 'Test-Path'),
  },

  // ---------------- Pipelines ----------------
  {
    id: 'ps.top-cpu',
    command: 'Get-Process | Sort-Object CPU -Descending | Select-Object -First 5',
    title: 'Top five processes by CPU',
    category: 'processes',
    subcategory: 'Pipelines',
    difficulty: 'intermediate',
    objective: 'Chain cmdlets with the pipeline to sort and limit objects.',
    summary: 'Gets all processes, sorts them by CPU time from highest to lowest, and keeps the first five.',
    details: 'The pipe passes whole objects, not text. Sort-Object reads the CPU property directly, so no text parsing is needed.',
    whenToUse: 'When a machine is slow and you want the heaviest processes.',
    syntax: [
      { token: 'Get-Process', meaning: 'all processes' },
      { token: '| Sort-Object CPU -Descending', meaning: 'sort by the CPU property, highest first' },
      { token: '| Select-Object -First 5', meaning: 'keep the first five objects' },
    ],
    sampleOutput: ` NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
    112   812.40     640.12   1,482.33    7720   1 chrome
     64   402.18     355.70     611.02    1184   1 Teams
     38   188.03     201.44     240.90    5560   1 Code
     22    74.12      96.21     118.40     932   0 MsMpEng
     18    40.55      62.30      77.12    4012   1 explorer`,
    mistakes: ['Writing Sort-Object -Descending CPU in the wrong place is fine, but forgetting -Descending gives the lowest first.'],
    recallPrompt: 'List the five processes that have used the most CPU time.',
    accepted: ['Get-Process | Sort-Object -Property CPU -Descending | Select-Object -First 5', 'Get-Process | Sort-Object CPU -Descending | Select -First 5', 'gps | sort CPU -Descending | select -First 5'],
    related: ['ps.get-process', 'ps.where-running'],
    keywords: ['top cpu', 'busiest processes', 'pipeline'],
    source: ps(UTIL, 'Sort-Object'),
  },
  {
    id: 'ps.where-running',
    command: "Get-Service | Where-Object Status -eq 'Running'",
    title: 'Filter objects with Where-Object',
    category: 'services',
    subcategory: 'Pipelines',
    difficulty: 'intermediate',
    objective: 'Keep only the objects whose property matches a condition.',
    summary: 'Lists only services whose Status property equals Running.',
    details: 'This is simplified syntax. The script block form, Where-Object { $_.Status -eq "Running" }, does the same and allows complex conditions. -eq is case-insensitive for strings.',
    whenToUse: 'Whenever you need a subset of objects.',
    syntax: [
      { token: 'Get-Service', meaning: 'all services' },
      { token: '| Where-Object', meaning: 'filter; alias where or ?' },
      { token: "Status -eq 'Running'", meaning: 'property, comparison, value' },
    ],
    sampleOutput: `Status   Name               DisplayName
------   ----               -----------
Running  Dhcp               DHCP Client
Running  Dnscache           DNS Client
Running  EventLog           Windows Event Log
Running  WinDefend          Microsoft Defender Antivirus Service`,
    mistakes: ['Using = or == instead of -eq.', 'Filtering late. Filter as early in the pipeline as possible.'],
    recallPrompt: 'List only the services that are currently running.',
    accepted: ['Get-Service | Where-Object { $_.Status -eq \'Running\' }', 'Get-Service | Where-Object Status -eq Running', 'Get-Service | Where-Object {$_.Status -eq "Running"}', 'Get-Service | where Status -eq Running'],
    related: ['ps.get-service', 'ps.top-cpu'],
    keywords: ['filter', 'where', 'running services'],
    source: ps(CORE, 'Where-Object'),
  },
  {
    id: 'ps.measure-object-sum',
    command: 'Get-ChildItem -Recurse -File | Measure-Object -Property Length -Sum',
    title: 'Total a property across objects',
    category: 'files',
    subcategory: 'Pipelines',
    difficulty: 'intermediate',
    objective: 'Calculate counts and sums with Measure-Object.',
    summary: 'Counts every file under the current folder and adds up their sizes in bytes.',
    whenToUse: 'When you need a folder size or a count of matching objects.',
    syntax: [
      { token: 'Get-ChildItem -Recurse -File', meaning: 'every file, no folders' },
      { token: '| Measure-Object', meaning: 'calculate statistics' },
      { token: '-Property Length -Sum', meaning: 'add up the Length property' },
    ],
    sampleOutput: `Count             : 214
Average           :
Sum               : 48211904
Maximum           :
Minimum           :
Property          : Length`,
    mistakes: ['Measuring folders, which have no Length property. Use -File.'],
    recallPrompt: 'Count every file under the current folder and total their sizes.',
    accepted: ['Get-ChildItem -File -Recurse | Measure-Object -Property Length -Sum', 'Get-ChildItem -Recurse -File | Measure-Object Length -Sum'],
    related: ['ps.get-childitem-recurse'],
    keywords: ['folder size', 'sum', 'count'],
    source: ps(UTIL, 'Measure-Object'),
  },
  {
    id: 'ps.group-object',
    command: 'Get-Service | Group-Object Status',
    title: 'Group objects by a property',
    category: 'services',
    subcategory: 'Pipelines',
    difficulty: 'intermediate',
    objective: 'Summarize objects by counting how many share each value.',
    summary: 'Groups services by Status and shows how many are Running and Stopped.',
    whenToUse: 'When building quick summaries, such as event counts by ID.',
    syntax: [
      { token: 'Get-Service', meaning: 'all services' },
      { token: '| Group-Object Status', meaning: 'group by the Status property' },
    ],
    sampleOutput: `Count Name                      Group
----- ----                      -----
  112 Running                   {AudioEndpointBuilder, Audiosrv, BFE, BrokerInfrastructure…}
  168 Stopped                   {AJRouter, ALG, AppIDSvc, AppMgmt…}`,
    mistakes: ['Grouping on a property that differs for every object, which gives one group each.'],
    recallPrompt: 'Count how many services are in each status.',
    accepted: ['Get-Service | Group-Object -Property Status'],
    related: ['ps.where-running'],
    keywords: ['group', 'summary', 'count by'],
    source: ps(UTIL, 'Group-Object'),
  },

  // ---------------- Objects and properties ----------------
  {
    id: 'ps.get-member',
    command: 'Get-Process | Get-Member',
    title: 'Discover object properties',
    category: 'fundamentals',
    subcategory: 'Objects and properties',
    difficulty: 'beginner',
    objective: 'Find out what properties and methods an object has.',
    summary: 'Lists the type name, properties, and methods of the process objects that Get-Process returns.',
    details: 'This is the most useful discovery tool in PowerShell. Once you see a property name here, you can sort, filter, and select on it.',
    whenToUse: 'Whenever you want to know what data a cmdlet returns.',
    syntax: [
      { token: 'Get-Process', meaning: 'produce objects' },
      { token: '| Get-Member', meaning: 'describe them; alias gm' },
    ],
    sampleOutput: `   TypeName: System.Diagnostics.Process

Name                       MemberType     Definition
----                       ----------     ----------
Kill                       Method         void Kill(), void Kill(bool entireProcessTree)
CPU                        ScriptProperty System.Object CPU {get=$this.TotalProcessorTime.TotalSeconds;}
Id                         Property       int Id {get;}
Path                       ScriptProperty System.Object Path {get=$this.Mainmodule.FileName;}
StartTime                  Property       datetime StartTime {get;}
WorkingSet64               Property       long WorkingSet64 {get;}`,
    mistakes: ['Assuming the default table shows every property. It shows only a few.'],
    recallPrompt: 'List the properties and methods of the objects that Get-Process returns.',
    accepted: ['Get-Process | gm'],
    related: ['ps.select-properties', 'ps.format-list'],
    keywords: ['properties', 'methods', 'object members'],
    source: ps(UTIL, 'Get-Member'),
  },
  {
    id: 'ps.select-properties',
    command: 'Get-Item .\\sample.txt | Select-Object Name, Length, LastWriteTime',
    title: 'Choose which properties to show',
    category: 'files',
    subcategory: 'Objects and properties',
    difficulty: 'beginner',
    objective: 'Pick specific properties from an object.',
    summary: 'Shows only the name, size in bytes, and last write time of sample.txt.',
    whenToUse: 'When you want a concise result or need to export specific columns.',
    syntax: [
      { token: 'Get-Item .\\sample.txt', meaning: 'one file object' },
      { token: '| Select-Object', meaning: 'choose properties; alias select' },
      { token: 'Name, Length, LastWriteTime', meaning: 'comma-separated property names' },
    ],
    sampleOutput: `Name       Length LastWriteTime
----       ------ -------------
sample.txt   1180 3/2/2026 5:40:10 PM`,
    mistakes: ['Separating property names with spaces instead of commas.'],
    recallPrompt: 'Show only the Name, Length, and LastWriteTime of sample.txt.',
    accepted: ['Get-Item .\\sample.txt | Select-Object -Property Name, Length, LastWriteTime', 'Get-Item sample.txt | Select-Object Name, Length, LastWriteTime', 'Get-Item .\\sample.txt | select Name, Length, LastWriteTime'],
    related: ['ps.get-member', 'ps.format-list'],
    keywords: ['select properties', 'columns'],
    source: ps(UTIL, 'Select-Object'),
  },
  {
    id: 'ps.format-list',
    command: 'Get-Service -Name WinRM | Format-List *',
    title: 'Show every property in a list',
    category: 'services',
    subcategory: 'Objects and properties',
    difficulty: 'intermediate',
    objective: 'See all properties of one object, one per line.',
    summary: 'Displays every property of the WinRM service object as a list.',
    details: 'Format-* cmdlets produce display output, not objects. Use them only at the end of a pipeline.',
    whenToUse: 'When inspecting a single object in detail.',
    syntax: [
      { token: 'Get-Service -Name WinRM', meaning: 'one service' },
      { token: '| Format-List *', meaning: 'list every property; alias fl' },
    ],
    sampleOutput: `Name                : WinRM
DisplayName         : Windows Remote Management (WS-Management)
Status              : Running
StartType           : Automatic
ServiceType         : Win32ShareProcess
DependentServices   : {}
ServicesDependedOn  : {RPCSS, HTTP}
CanStop             : True`,
    mistakes: ['Piping Format-List output into Export-Csv, which writes formatting objects instead of data.'],
    recallPrompt: 'Show every property of the WinRM service as a list.',
    accepted: ['Get-Service WinRM | Format-List *', 'Get-Service -Name WinRM | fl *', 'Get-Service WinRM | fl *'],
    related: ['ps.select-properties'],
    keywords: ['format list', 'all properties'],
    source: ps(UTIL, 'Format-List'),
  },

  // ---------------- Variables and data types ----------------
  {
    id: 'ps.variable-assign',
    command: '$procs = Get-Process; $procs.Count',
    title: 'Store results in a variable',
    category: 'scripting',
    subcategory: 'Variables and data types',
    difficulty: 'beginner',
    objective: 'Save objects in a variable and read a property of the collection.',
    summary: 'Stores all process objects in $procs, then prints how many there are.',
    whenToUse: 'When you want to reuse a result without running the command again.',
    syntax: [
      { token: '$procs = Get-Process', meaning: 'assign the output to a variable' },
      { token: ';', meaning: 'statement separator' },
      { token: '$procs.Count', meaning: 'number of items in the collection' },
    ],
    sampleOutput: '187',
    mistakes: ['Forgetting the $ when reading the variable.'],
    recallPrompt: 'Save all processes in a variable named $procs, then print how many there are.',
    related: ['ps.env-var', 'ps.gettype'],
    keywords: ['variable', 'assign', 'count'],
    source: { label: 'about_Variables on Microsoft Learn', url: 'https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_variables' },
  },
  {
    id: 'ps.env-var',
    command: '$env:COMPUTERNAME',
    title: 'Read an environment variable',
    category: 'scripting',
    subcategory: 'Variables and data types',
    difficulty: 'beginner',
    objective: 'Read Windows environment variables from PowerShell.',
    summary: 'Prints the computer name from the COMPUTERNAME environment variable.',
    whenToUse: 'When a script needs the machine name, user name, or a system path.',
    syntax: [
      { token: '$env:', meaning: 'the environment provider drive' },
      { token: 'COMPUTERNAME', meaning: 'variable name' },
    ],
    sampleOutput: 'WS-LAB-07',
    mistakes: ['Using %COMPUTERNAME%, which is Command Prompt syntax.'],
    requirements: 'COMPUTERNAME is defined on Windows. On Linux and macOS use [Environment]::MachineName.',
    recallPrompt: 'Print the computer name from its environment variable.',
    related: ['ps.variable-assign', 'win.hostname'],
    keywords: ['environment variable', 'computer name'],
    source: { label: 'about_Environment_Variables on Microsoft Learn', url: 'https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_environment_variables' },
  },
  {
    id: 'ps.gettype',
    command: "('443').GetType().Name; ([int]'443').GetType().Name",
    title: 'Check and convert types',
    category: 'scripting',
    subcategory: 'Variables and data types',
    difficulty: 'intermediate',
    objective: 'See the difference between a string and a number, and convert between them.',
    summary: 'Shows that "443" is a String and that casting it with [int] produces an Int32.',
    details: 'Types matter for comparisons. "10" -gt "9" is False because strings compare character by character, while 10 -gt 9 is True.',
    whenToUse: 'When a comparison or sort gives a surprising result.',
    syntax: [
      { token: "('443').GetType().Name", meaning: 'type of a string literal' },
      { token: "[int]'443'", meaning: 'cast to a 32-bit integer' },
    ],
    sampleOutput: `String
Int32`,
    mistakes: ['Comparing numbers stored as strings.'],
    recallPrompt: 'Show the type name of the string \'443\', then of the same value cast to an integer.',
    related: ['ps.variable-assign'],
    keywords: ['types', 'cast', 'integer', 'string'],
    source: { label: 'about_Type_Conversion on Microsoft Learn', url: 'https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_type_conversion' },
  },

  // ---------------- Scripting fundamentals ----------------
  {
    id: 'ps.foreach-object',
    command: '1..5 | ForEach-Object { $_ * 2 }',
    title: 'Process each item in the pipeline',
    category: 'scripting',
    subcategory: 'Scripting fundamentals',
    difficulty: 'intermediate',
    objective: 'Run a script block once for each object.',
    summary: 'Takes the numbers 1 to 5 and outputs each one multiplied by 2.',
    details: '$_ (also $PSItem) is the current pipeline object. The range operator .. creates the sequence.',
    whenToUse: 'When you need to transform or act on every object in a pipeline.',
    syntax: [
      { token: '1..5', meaning: 'range: 1, 2, 3, 4, 5' },
      { token: '| ForEach-Object', meaning: 'loop over each item; alias % or foreach' },
      { token: '{ $_ * 2 }', meaning: 'script block; $_ is the current item' },
    ],
    sampleOutput: `2
4
6
8
10`,
    mistakes: ['Using $_ outside a script block.'],
    recallPrompt: 'Double each number from 1 to 5 using the pipeline.',
    accepted: ['1..5 | ForEach-Object { $PSItem * 2 }', '1..5 | % { $_ * 2 }', '1..5 | foreach { $_ * 2 }'],
    related: ['ps.if-test-path'],
    keywords: ['loop', 'foreach', 'pipeline'],
    source: ps(CORE, 'ForEach-Object'),
  },
  {
    id: 'ps.if-test-path',
    command: "if (Test-Path .\\config.json) { 'found' } else { 'missing' }",
    title: 'Branch with if and else',
    category: 'scripting',
    subcategory: 'Scripting fundamentals',
    difficulty: 'intermediate',
    objective: 'Run different code depending on a condition.',
    summary: 'Outputs "found" if config.json exists and "missing" if it does not.',
    whenToUse: 'In scripts that must check prerequisites.',
    syntax: [
      { token: 'if (Test-Path .\\config.json)', meaning: 'condition in parentheses' },
      { token: "{ 'found' }", meaning: 'runs when true' },
      { token: "else { 'missing' }", meaning: 'runs when false' },
    ],
    sampleOutput: 'found',
    mistakes: ['Using square brackets for the condition, as in Bash.'],
    recallPrompt: 'Write an if/else that outputs found or missing depending on whether config.json exists.',
    accepted: ['if (Test-Path .\\config.json) { "found" } else { "missing" }', "if (Test-Path config.json) { 'found' } else { 'missing' }"],
    related: ['ps.test-path', 'ps.try-catch'],
    keywords: ['if statement', 'condition'],
    source: { label: 'about_If on Microsoft Learn', url: 'https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_if' },
  },

  // ---------------- Functions ----------------
  {
    id: 'ps.function-basic',
    command: 'function Get-LabUptime { (Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime }',
    title: 'Write a small function',
    category: 'scripting',
    subcategory: 'Functions',
    difficulty: 'advanced',
    objective: 'Package a reusable command into a named function.',
    summary: 'Defines Get-LabUptime, which subtracts the last boot time from the current time and returns how long the system has been up.',
    details: 'Subtracting two DateTime objects returns a TimeSpan with Days, Hours, and Minutes properties. PowerShell 7 already has a Get-Uptime cmdlet, so this example uses a different name.',
    whenToUse: 'When you repeat the same logic and want to call it by name.',
    syntax: [
      { token: 'function Get-LabUptime', meaning: 'define a function using an approved verb' },
      { token: '(Get-Date)', meaning: 'now' },
      { token: '(Get-CimInstance Win32_OperatingSystem).LastBootUpTime', meaning: 'when Windows last started' },
    ],
    sampleOutput: `Days              : 1
Hours             : 2
Minutes           : 9
Seconds           : 41
TotalHours        : 26.1613888888889`,
    mistakes: ['Naming functions with unapproved verbs, which produces a warning when exported from a module.'],
    requirements: 'Windows. Get-CimInstance is available in Windows PowerShell 3.0 and later and PowerShell 7 on Windows.',
    recallPrompt: 'Define a function named Get-LabUptime that returns the time since the last boot.',
    related: ['ps.cim-os', 'ps.try-catch'],
    keywords: ['function', 'reusable code'],
    source: { label: 'about_Functions on Microsoft Learn', url: 'https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_functions' },
  },
  {
    id: 'ps.function-param',
    command: 'function Test-LabPort { param([string]$ComputerName, [int]$Port) Test-NetConnection $ComputerName -Port $Port }',
    title: 'Add parameters to a function',
    category: 'scripting',
    subcategory: 'Functions',
    difficulty: 'advanced',
    objective: 'Accept typed input in a function with a param block.',
    summary: 'Defines Test-LabPort, which takes a computer name and port and tests the TCP connection.',
    whenToUse: 'When wrapping a command you run often with different values.',
    syntax: [
      { token: 'param(...)', meaning: 'declare parameters' },
      { token: '[string]$ComputerName', meaning: 'typed parameter' },
      { token: '[int]$Port', meaning: 'typed parameter; non-numbers are rejected' },
    ],
    sampleOutput: '',
    mistakes: ['Calling the function with commas, as in Test-LabPort a, 443. Use named parameters.'],
    requirements: 'Test-NetConnection is Windows-only.',
    recallPrompt: 'Define Test-LabPort with typed ComputerName and Port parameters that calls Test-NetConnection.',
    related: ['ps.function-basic', 'ps.test-netconnection-port'],
    keywords: ['parameters', 'param block'],
    source: { label: 'about_Functions_Advanced_Parameters on Microsoft Learn', url: 'https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_functions_advanced_parameters' },
  },

  // ---------------- Error handling ----------------
  {
    id: 'ps.try-catch',
    command: 'try { Get-Item .\\missing.txt -ErrorAction Stop } catch { Write-Warning $_.Exception.Message }',
    title: 'Handle errors with try and catch',
    category: 'scripting',
    subcategory: 'Structured error handling',
    difficulty: 'advanced',
    objective: 'Catch an error and respond to it instead of letting the script fail noisily.',
    summary: 'Tries to read missing.txt. The error is caught and printed as a warning.',
    details: 'Most cmdlet errors are non-terminating, so catch never sees them. -ErrorAction Stop turns the error into a terminating one that catch can handle.',
    whenToUse: 'In scripts that must keep running or report errors cleanly.',
    syntax: [
      { token: 'try { ... }', meaning: 'code that might fail' },
      { token: '-ErrorAction Stop', meaning: 'make the error terminating' },
      { token: 'catch { ... }', meaning: 'runs when an error is thrown' },
      { token: '$_.Exception.Message', meaning: 'the error text' },
    ],
    sampleOutput: "WARNING: Cannot find path 'C:\\Labs\\missing.txt' because it does not exist.",
    mistakes: ['Leaving out -ErrorAction Stop and wondering why catch never runs.'],
    recallPrompt: 'Try to get missing.txt so that a failure is caught and printed as a warning.',
    related: ['ps.if-test-path', 'ps.erroraction'],
    keywords: ['error handling', 'try catch', 'exception'],
    source: { label: 'about_Try_Catch_Finally on Microsoft Learn', url: 'https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_try_catch_finally' },
  },
  {
    id: 'ps.erroraction',
    command: 'Get-ChildItem C:\\Windows\\System32\\config -ErrorAction SilentlyContinue',
    title: 'Control error behavior',
    category: 'scripting',
    subcategory: 'Structured error handling',
    difficulty: 'advanced',
    objective: 'Decide whether a cmdlet should stop, continue, or stay silent on errors.',
    summary: 'Lists the folder while suppressing access-denied errors for items you cannot read.',
    details: 'SilentlyContinue hides errors but they are still recorded in $Error. Use it deliberately. Hiding errors can hide real problems.',
    whenToUse: 'When expected errors, such as permission denials, clutter the output.',
    syntax: [
      { token: '-ErrorAction', meaning: 'common parameter for error handling' },
      { token: 'SilentlyContinue', meaning: 'do not display, keep going' },
    ],
    sampleOutput: `    Directory: C:\\Windows\\System32\\config

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----          03/02/2026    07:15                Journal
d----          03/02/2026    07:15                RegBack`,
    mistakes: ['Adding SilentlyContinue everywhere so failures go unnoticed.'],
    recallPrompt: 'List C:\\Windows\\System32\\config while hiding any errors.',
    accepted: ['Get-ChildItem -Path C:\\Windows\\System32\\config -ErrorAction SilentlyContinue', 'Get-ChildItem C:\\Windows\\System32\\config -ea SilentlyContinue'],
    related: ['ps.try-catch'],
    keywords: ['erroraction', 'suppress errors'],
    source: { label: 'about_CommonParameters on Microsoft Learn', url: 'https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_commonparameters' },
  },

  // ---------------- Text and automation ----------------
  {
    id: 'ps.select-string',
    command: "Select-String -Path .\\*.log -Pattern 'error'",
    title: 'Search text in files',
    category: 'text',
    subcategory: 'Pipeline filtering',
    difficulty: 'intermediate',
    objective: 'Find matching lines across files, like grep.',
    summary: 'Searches every .log file in the current folder for "error" and shows file, line number, and line.',
    details: 'Matching is case-insensitive by default. Add -CaseSensitive to change that. Each result is a MatchInfo object with Path, LineNumber, and Line properties.',
    whenToUse: 'When scanning logs or source files for a word or pattern.',
    syntax: [
      { token: 'Select-String', meaning: 'search text; alias sls' },
      { token: '-Path .\\*.log', meaning: 'files to search' },
      { token: "-Pattern 'error'", meaning: 'regular expression to match' },
    ],
    sampleOutput: `app.log:1412:2026-03-03 09:15:10 ERROR db: connection refused (host=10.0.2.15 port=5432)
app.log:1418:2026-03-03 09:15:16 ERROR db: connection refused (host=10.0.2.15 port=5432)
error.log:3:Unhandled error in worker 2`,
    mistakes: ['Forgetting that the pattern is a regular expression, so characters like . and ( have special meaning.'],
    recallPrompt: 'Search every .log file in this folder for the word error.',
    accepted: ['Select-String -Path *.log -Pattern error', "Select-String -Pattern 'error' -Path .\\*.log", 'Select-String -Path .\\*.log -Pattern error', "sls -Path .\\*.log -Pattern 'error'"],
    related: ['ps.get-content-tail'],
    keywords: ['grep powershell', 'search text', 'find in files'],
    source: ps(UTIL, 'Select-String'),
  },
  {
    id: 'ps.export-csv',
    command: 'Get-Service | Select-Object Name, Status, StartType | Export-Csv .\\services.csv -NoTypeInformation',
    title: 'Export objects to CSV',
    category: 'automation',
    subcategory: 'Automation patterns',
    difficulty: 'intermediate',
    objective: 'Save structured results to a file others can open in a spreadsheet.',
    summary: 'Exports the name, status, and start type of every service to services.csv.',
    details: '-NoTypeInformation removes the #TYPE header line in Windows PowerShell 5.1. PowerShell 7 omits it by default, so the switch is harmless there.',
    whenToUse: 'When producing an inventory or report.',
    syntax: [
      { token: 'Select-Object Name, Status, StartType', meaning: 'choose columns first' },
      { token: '| Export-Csv .\\services.csv', meaning: 'write CSV' },
      { token: '-NoTypeInformation', meaning: 'omit the type header in 5.1' },
    ],
    sampleOutput: '',
    mistakes: ['Exporting Format-Table output, which produces unreadable CSV.'],
    safety: 'changes-state',
    recallPrompt: 'Export each service name, status, and start type to services.csv without the type header.',
    accepted: ['Get-Service | Select-Object Name,Status,StartType | Export-Csv -Path .\\services.csv -NoTypeInformation', 'Get-Service | Select-Object Name, Status, StartType | Export-Csv -Path .\\services.csv -NoTypeInformation'],
    related: ['ps.import-csv', 'ps.convertto-json'],
    keywords: ['csv', 'export', 'report'],
    source: ps(UTIL, 'Export-Csv'),
  },
  {
    id: 'ps.import-csv',
    command: 'Import-Csv .\\servers.csv | ForEach-Object { $_.Name }',
    title: 'Read a CSV as objects',
    category: 'automation',
    subcategory: 'Automation patterns',
    difficulty: 'intermediate',
    objective: 'Turn rows of a CSV file into objects you can loop over.',
    summary: 'Reads servers.csv and prints the Name column of each row.',
    whenToUse: 'When a script should act on a list of servers or users kept in a spreadsheet.',
    syntax: [
      { token: 'Import-Csv .\\servers.csv', meaning: 'each row becomes an object; headers become properties' },
      { token: '| ForEach-Object { $_.Name }', meaning: 'read the Name column' },
    ],
    sampleOutput: `SRV-APP01
SRV-DB01
SRV-WEB01`,
    mistakes: ['Expecting numbers. Every CSV value is imported as a string.'],
    recallPrompt: 'Read servers.csv and print the Name of each row.',
    accepted: ['Import-Csv -Path .\\servers.csv | ForEach-Object { $_.Name }', 'Import-Csv .\\servers.csv | Select-Object -ExpandProperty Name'],
    related: ['ps.export-csv', 'ps.foreach-object'],
    keywords: ['import csv', 'read csv'],
    source: ps(UTIL, 'Import-Csv'),
  },
  {
    id: 'ps.convertto-json',
    command: 'Get-NetIPConfiguration | ConvertTo-Json -Depth 3',
    title: 'Convert objects to JSON',
    category: 'automation',
    subcategory: 'Automation patterns',
    difficulty: 'advanced',
    objective: 'Serialize results for an API, a ticket, or another program.',
    summary: 'Converts the network configuration objects to JSON, three levels deep.',
    details: 'The default depth is 2. Deeper nested objects are flattened to their type name, so raise -Depth when you need the detail.',
    whenToUse: 'When sharing structured data or feeding it to another tool.',
    syntax: [
      { token: 'Get-NetIPConfiguration', meaning: 'source objects' },
      { token: '| ConvertTo-Json', meaning: 'serialize to JSON' },
      { token: '-Depth 3', meaning: 'how many nested levels to include' },
    ],
    sampleOutput: `[
  {
    "InterfaceAlias": "Ethernet",
    "InterfaceIndex": 12,
    "IPv4Address": [ { "IPAddress": "192.0.2.57", "PrefixLength": 24 } ],
    "IPv4DefaultGateway": [ { "NextHop": "192.0.2.1" } ],
    "DNSServer": [ { "ServerAddresses": [ "192.0.2.53" ] } ]
  }
]`,
    mistakes: ['Leaving the default depth and getting type names instead of values.'],
    requirements: 'Get-NetIPConfiguration is Windows-only.',
    recallPrompt: 'Convert the network configuration to JSON with a depth of 3.',
    accepted: ['Get-NetIPConfiguration | ConvertTo-Json -Depth 3'],
    related: ['ps.export-csv', 'ps.get-netipconfiguration'],
    keywords: ['json', 'serialize'],
    source: ps(UTIL, 'ConvertTo-Json'),
  },
])

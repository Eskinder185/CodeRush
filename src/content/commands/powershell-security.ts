import { define, ps } from './helpers'

/** Defensive PowerShell: execution policy, Defender, firewall, accounts, ACLs, hashing, persistence review. */
export const powershellSecurity = define('powershell', [
  {
    id: 'ps.get-executionpolicy',
    command: 'Get-ExecutionPolicy -List',
    title: 'Review execution policy scopes',
    category: 'security',
    subcategory: 'Security inspection',
    difficulty: 'intermediate',
    objective: 'See which script execution policy applies at each scope.',
    summary: 'Lists the execution policy set at each scope, from Group Policy down to the current process.',
    details: 'Execution policy is a safety feature that helps prevent running scripts by accident. It is not a security boundary, and a user can bypass it. The most specific defined scope wins, with Group Policy scopes taking precedence.',
    whenToUse: 'When a script will not run, or during a configuration review.',
    syntax: [
      { token: 'Get-ExecutionPolicy', meaning: 'read the effective policy' },
      { token: '-List', meaning: 'show every scope' },
    ],
    sampleOutput: `        Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser    RemoteSigned
 LocalMachine    RemoteSigned`,
    mistakes: ['Treating execution policy as a defense against attackers. It only prevents accidental execution.'],
    requirements: 'Windows. On Linux and macOS the policy is always Unrestricted and cannot be changed.',
    recallPrompt: 'Show the execution policy at every scope.',
    related: ['ps.get-mpcomputerstatus'],
    keywords: ['execution policy', 'script blocked'],
    source: ps('Microsoft.PowerShell.Security', 'Get-ExecutionPolicy'),
  },
  {
    id: 'ps.get-mpcomputerstatus',
    command: 'Get-MpComputerStatus',
    title: 'Check Microsoft Defender status',
    category: 'security',
    subcategory: 'Security inspection',
    difficulty: 'intermediate',
    objective: 'Confirm antivirus protection is on and signatures are current.',
    summary: 'Shows whether Defender real-time protection is enabled, when signatures were updated, and the last scan times.',
    whenToUse: 'During endpoint health checks or after an alert.',
    notice: 'Check RealTimeProtectionEnabled and AntivirusSignatureLastUpdated.',
    syntax: [{ token: 'Get-MpComputerStatus', meaning: 'Defender antimalware status' }],
    sampleOutput: `AMRunningMode                   : Normal
AntivirusEnabled                : True
AntivirusSignatureLastUpdated   : 3/3/2026 4:12:08 AM
AntivirusSignatureVersion       : 1.425.120.0
BehaviorMonitorEnabled          : True
RealTimeProtectionEnabled       : True
QuickScanEndTime                : 3/2/2026 12:41:30 PM
TamperProtectionSource          : Signatures`,
    mistakes: ['Running it where a third-party antivirus is primary. Defender may show passive mode.'],
    requirements: 'Windows with Microsoft Defender Antivirus. Defender module.',
    recallPrompt: 'Check Microsoft Defender protection and signature status.',
    related: ['ps.get-netfirewallprofile'],
    keywords: ['antivirus', 'defender', 'endpoint protection'],
    source: ps('Defender', 'Get-MpComputerStatus'),
  },
  {
    id: 'ps.get-netfirewallprofile',
    command: 'Get-NetFirewallProfile | Select-Object Name, Enabled, DefaultInboundAction, DefaultOutboundAction',
    title: 'Check firewall profiles',
    category: 'security',
    subcategory: 'Security inspection',
    difficulty: 'intermediate',
    objective: 'Confirm Windows Firewall is enabled for each network profile.',
    summary: 'Shows whether the Domain, Private, and Public firewall profiles are enabled and their default actions.',
    whenToUse: 'During hardening reviews, or when traffic is unexpectedly blocked.',
    notice: 'A hardened workstation has all three profiles enabled with inbound Block. NotConfigured means the built-in default applies.',
    syntax: [
      { token: 'Get-NetFirewallProfile', meaning: 'firewall profile settings' },
      { token: 'Select-Object Name, Enabled, ...', meaning: 'the key fields' },
    ],
    sampleOutput: `Name    Enabled DefaultInboundAction DefaultOutboundAction
----    ------- -------------------- ---------------------
Domain     True        NotConfigured         NotConfigured
Private    True        NotConfigured         NotConfigured
Public    False        NotConfigured         NotConfigured`,
    mistakes: ['Reading NotConfigured as "allow". The built-in default for inbound is Block.'],
    requirements: 'Windows 8 or Windows Server 2012 and later. NetSecurity module.',
    recallPrompt: 'Show whether each firewall profile is enabled and its default inbound and outbound actions.',
    accepted: ['Get-NetFirewallProfile | Select-Object Name,Enabled,DefaultInboundAction,DefaultOutboundAction', 'Get-NetFirewallProfile'],
    related: ['ps.get-netfirewallrule'],
    keywords: ['firewall', 'firewall status', 'windows firewall'],
    source: ps('NetSecurity', 'Get-NetFirewallProfile'),
  },
  {
    id: 'ps.get-netfirewallrule',
    command: 'Get-NetFirewallRule -Direction Inbound -Enabled True -Action Allow',
    title: 'List enabled inbound allow rules',
    category: 'security',
    subcategory: 'Security inspection',
    difficulty: 'advanced',
    objective: 'Review which inbound traffic Windows Firewall explicitly allows.',
    summary: 'Lists enabled firewall rules that allow inbound traffic.',
    details: 'Rules do not show ports directly. Pipe a rule to Get-NetFirewallPortFilter to see its protocol and ports, and to Get-NetFirewallAddressFilter for addresses.',
    whenToUse: 'When auditing what a machine exposes, or why a port is reachable.',
    syntax: [
      { token: 'Get-NetFirewallRule', meaning: 'firewall rules' },
      { token: '-Direction Inbound', meaning: 'incoming traffic' },
      { token: '-Enabled True', meaning: 'active rules only' },
      { token: '-Action Allow', meaning: 'rules that permit traffic' },
    ],
    sampleOutput: `Name                  : RemoteDesktop-UserMode-In-TCP
DisplayName           : Remote Desktop - User Mode (TCP-In)
Enabled               : True
Profile               : Domain, Private
Direction             : Inbound
Action                : Allow

Name                  : WINRM-HTTP-In-TCP
DisplayName           : Windows Remote Management (HTTP-In)
Enabled               : True
Profile               : Domain, Private
Direction             : Inbound
Action                : Allow`,
    mistakes: ['Passing -Enabled $true. The parameter takes the string True or False.'],
    requirements: 'Windows 8 or Windows Server 2012 and later. NetSecurity module.',
    recallPrompt: 'List enabled firewall rules that allow inbound traffic.',
    accepted: ['Get-NetFirewallRule -Enabled True -Direction Inbound -Action Allow', 'Get-NetFirewallRule -Direction Inbound -Action Allow -Enabled True'],
    related: ['ps.get-netfirewallprofile', 'ps.get-nettcpconnection-listen'],
    keywords: ['firewall rules', 'inbound rules', 'allowed ports'],
    source: ps('NetSecurity', 'Get-NetFirewallRule'),
  },
  {
    id: 'ps.get-localuser',
    command: 'Get-LocalUser',
    title: 'List local accounts',
    category: 'users',
    subcategory: 'Security inspection',
    difficulty: 'beginner',
    objective: 'See every local account and whether it is enabled.',
    summary: 'Lists local user accounts with their enabled state and description.',
    whenToUse: 'During access reviews, to find unexpected or unused local accounts.',
    syntax: [{ token: 'Get-LocalUser', meaning: 'local user accounts' }],
    sampleOutput: `Name               Enabled Description
----               ------- -----------
Administrator      False   Built-in account for administering the computer/domain
DefaultAccount     False   A user account managed by the system.
Guest              False   Built-in account for guest access to the computer/domain
labuser            True
support2           True    Temporary vendor account`,
    mistakes: ['Expecting domain accounts here. This lists local accounts only.'],
    requirements: 'Windows 10, Windows Server 2016, and later. Microsoft.PowerShell.LocalAccounts module, built into Windows PowerShell 5.1.',
    recallPrompt: 'List the local user accounts on this computer.',
    related: ['ps.localuser-lastlogon', 'ps.get-localgroupmember'],
    keywords: ['local users', 'accounts', 'net user'],
    source: ps('Microsoft.PowerShell.LocalAccounts', 'Get-LocalUser'),
  },
  {
    id: 'ps.localuser-lastlogon',
    command: 'Get-LocalUser | Where-Object Enabled | Select-Object Name, LastLogon, PasswordLastSet',
    title: 'Audit enabled accounts',
    category: 'users',
    subcategory: 'Defensive system auditing',
    difficulty: 'advanced',
    objective: 'Find enabled local accounts and when they were last used.',
    summary: 'Shows enabled local accounts with their last logon and when their password was last set.',
    whenToUse: 'When looking for stale or unexpected accounts during an audit.',
    notice: 'An enabled account that never logged in, or one with a very old password, deserves a question.',
    syntax: [
      { token: 'Get-LocalUser', meaning: 'local accounts' },
      { token: '| Where-Object Enabled', meaning: 'keep accounts where Enabled is true' },
      { token: '| Select-Object Name, LastLogon, PasswordLastSet', meaning: 'audit fields' },
    ],
    sampleOutput: `Name     LastLogon            PasswordLastSet
----     ---------            ---------------
labuser  3/3/2026 8:01:12 AM  1/9/2026 10:20:44 AM
support2                      6/14/2024 3:02:19 PM`,
    mistakes: ['Assuming an empty LastLogon is an error. It means the account never signed in interactively.'],
    requirements: 'Windows 10, Windows Server 2016, and later.',
    recallPrompt: 'List enabled local accounts with their last logon and password-last-set dates.',
    accepted: ['Get-LocalUser | Where-Object { $_.Enabled } | Select-Object Name, LastLogon, PasswordLastSet', 'Get-LocalUser | Where-Object Enabled -eq $true | Select-Object Name, LastLogon, PasswordLastSet'],
    related: ['ps.get-localuser'],
    keywords: ['stale accounts', 'last logon', 'audit'],
    source: ps('Microsoft.PowerShell.LocalAccounts', 'Get-LocalUser'),
  },
  {
    id: 'ps.get-localgroup',
    command: 'Get-LocalGroup',
    title: 'List local groups',
    category: 'users',
    subcategory: 'Security inspection',
    difficulty: 'beginner',
    objective: 'See the local security groups on a computer.',
    summary: 'Lists local groups such as Administrators, Users, and Remote Desktop Users.',
    whenToUse: 'Before checking membership of a privileged group.',
    syntax: [{ token: 'Get-LocalGroup', meaning: 'local security groups' }],
    sampleOutput: `Name                                Description
----                                -----------
Administrators                      Administrators have complete and unrestricted access to the computer/domain
Backup Operators                    Backup Operators can override security restrictions for the sole purpose of backing up or restoring files
Remote Desktop Users                Members in this group are granted the right to logon remotely
Users                               Users are prevented from making accidental or intentional system-wide changes`,
    mistakes: ['Assuming group names are the same in every language. Names are localized; SIDs are not.'],
    requirements: 'Windows 10, Windows Server 2016, and later.',
    recallPrompt: 'List the local security groups on this computer.',
    related: ['ps.get-localgroupmember'],
    keywords: ['local groups'],
    source: ps('Microsoft.PowerShell.LocalAccounts', 'Get-LocalGroup'),
  },
  {
    id: 'ps.get-localgroupmember',
    command: 'Get-LocalGroupMember -Group Administrators',
    title: 'List local administrators',
    category: 'users',
    subcategory: 'Security inspection',
    difficulty: 'intermediate',
    objective: 'Find every account with full control of a computer.',
    summary: 'Lists the members of the local Administrators group, including domain users and groups.',
    whenToUse: 'During least-privilege reviews, or after an alert about privilege changes.',
    notice: 'Every member here has full control. Each one should have a documented reason.',
    syntax: [
      { token: 'Get-LocalGroupMember', meaning: 'members of a local group' },
      { token: '-Group Administrators', meaning: 'which group' },
    ],
    sampleOutput: `ObjectClass Name                       PrincipalSource
----------- ----                       ---------------
User        WS-LAB-07\\Administrator    Local
Group       LAB\\Domain Admins          ActiveDirectory
User        WS-LAB-07\\support2         Local`,
    mistakes: ['Overlooking nested domain groups, whose members are also administrators.'],
    requirements: 'Windows 10, Windows Server 2016, and later.',
    recallPrompt: 'List every member of the local Administrators group.',
    accepted: ["Get-LocalGroupMember -Group 'Administrators'", 'Get-LocalGroupMember Administrators', 'Get-LocalGroupMember -Name Administrators'],
    related: ['ps.get-localuser', 'ps.get-localgroup'],
    keywords: ['local admins', 'administrators group', 'privileged accounts'],
    source: ps('Microsoft.PowerShell.LocalAccounts', 'Get-LocalGroupMember'),
  },
  {
    id: 'ps.get-acl',
    command: 'Get-Acl .\\sample.txt',
    title: 'Read a file access control list',
    category: 'permissions',
    subcategory: 'File permissions',
    difficulty: 'intermediate',
    objective: 'See who owns a file and who has access to it.',
    summary: 'Shows the owner and access rules of sample.txt.',
    whenToUse: 'When a user cannot open a file, or a file is open to too many people.',
    syntax: [
      { token: 'Get-Acl', meaning: 'get the security descriptor' },
      { token: '.\\sample.txt', meaning: 'file or folder' },
    ],
    sampleOutput: `    Directory: C:\\Labs

Path       Owner             Access
----       -----             ------
sample.txt WS-LAB-07\\labuser NT AUTHORITY\\SYSTEM Allow  FullControl…`,
    mistakes: ['Reading only the truncated Access column. Expand it with (Get-Acl .\\sample.txt).Access.'],
    requirements: 'Windows file systems such as NTFS.',
    recallPrompt: 'Show the owner and access rules of sample.txt.',
    accepted: ['Get-Acl -Path .\\sample.txt', 'Get-Acl sample.txt'],
    related: ['ps.get-acl-access'],
    keywords: ['permissions', 'acl', 'ntfs permissions'],
    source: ps('Microsoft.PowerShell.Security', 'Get-Acl'),
  },
  {
    id: 'ps.get-acl-access',
    command: '(Get-Acl .\\sample.txt).Access | Select-Object IdentityReference, FileSystemRights, AccessControlType',
    title: 'Expand access rules',
    category: 'permissions',
    subcategory: 'File permissions',
    difficulty: 'advanced',
    objective: 'List every access rule on a file, one per row.',
    summary: 'Shows each identity with access to sample.txt, what rights it has, and whether the rule allows or denies.',
    whenToUse: 'When checking for overly broad rules such as Everyone with Modify.',
    notice: 'Look for Everyone, Authenticated Users, or Users with Write, Modify, or FullControl on sensitive files.',
    syntax: [
      { token: '(Get-Acl .\\sample.txt).Access', meaning: 'the access rules collection' },
      { token: 'Select-Object IdentityReference, FileSystemRights, AccessControlType', meaning: 'who, what, allow or deny' },
    ],
    sampleOutput: `IdentityReference          FileSystemRights AccessControlType
-----------------          ---------------- -----------------
NT AUTHORITY\\SYSTEM             FullControl             Allow
BUILTIN\\Administrators          FullControl             Allow
WS-LAB-07\\labuser               FullControl             Allow
Everyone                              Modify             Allow`,
    mistakes: ['Forgetting the parentheses, so .Access is read before Get-Acl runs.'],
    requirements: 'Windows file systems such as NTFS.',
    recallPrompt: 'List each identity, right, and allow or deny type on sample.txt.',
    accepted: ['(Get-Acl .\\sample.txt).Access | Select-Object IdentityReference,FileSystemRights,AccessControlType'],
    related: ['ps.get-acl'],
    keywords: ['access rules', 'everyone permission'],
    source: ps('Microsoft.PowerShell.Security', 'Get-Acl'),
  },
  {
    id: 'ps.get-filehash',
    command: 'Get-FileHash .\\sample.txt -Algorithm SHA256',
    title: 'Compute a file hash',
    category: 'security',
    subcategory: 'File integrity',
    difficulty: 'beginner',
    objective: 'Produce a fingerprint of a file to verify or compare it.',
    summary: 'Computes the SHA-256 hash of sample.txt. Any change to the file changes the hash.',
    whenToUse: 'When verifying a download, comparing two files, or recording evidence about a suspicious executable.',
    syntax: [
      { token: 'Get-FileHash', meaning: 'compute a hash' },
      { token: '.\\sample.txt', meaning: 'file' },
      { token: '-Algorithm SHA256', meaning: 'hash algorithm; SHA256 is the default' },
    ],
    sampleOutput: `Algorithm       Hash                                                                   Path
---------       ----                                                                   ----
SHA256          9F2C1B7E4A3D5C6B8E0F1A2D3C4B5A6978E1F0D2C3B4A5968778695A4B3C2D1E       C:\\Labs\\sample.txt`,
    mistakes: ['Comparing hashes by eye. Compare them with -eq, which is case-insensitive for strings.'],
    requirements: 'PowerShell 4.0 and later.',
    recallPrompt: 'Compute the SHA-256 hash of sample.txt.',
    accepted: ['Get-FileHash -Path .\\sample.txt -Algorithm SHA256', 'Get-FileHash .\\sample.txt', 'Get-FileHash sample.txt -Algorithm SHA256'],
    related: ['linux.sha256sum', 'ps.get-process-id'],
    keywords: ['hash', 'checksum', 'sha256', 'integrity', 'certutil'],
    source: ps('Microsoft.PowerShell.Utility', 'Get-FileHash'),
  },
  {
    id: 'ps.get-scheduledtask',
    command: "Get-ScheduledTask | Where-Object State -eq 'Ready' | Select-Object TaskPath, TaskName",
    title: 'Review scheduled tasks',
    category: 'security',
    subcategory: 'Defensive system auditing',
    difficulty: 'intermediate',
    objective: 'List scheduled tasks that are ready to run.',
    summary: 'Lists ready scheduled tasks with their folder path and name.',
    whenToUse: 'When reviewing persistence. Unwanted software often schedules itself.',
    notice: 'Most tasks live under \\Microsoft\\. Tasks in the root folder or with random names deserve review.',
    syntax: [
      { token: 'Get-ScheduledTask', meaning: 'scheduled tasks' },
      { token: "| Where-Object State -eq 'Ready'", meaning: 'enabled tasks waiting for a trigger' },
      { token: '| Select-Object TaskPath, TaskName', meaning: 'location and name' },
    ],
    sampleOutput: `TaskPath                                       TaskName
--------                                       --------
\\                                              OneDrive Standalone Update Task-S-1-5-21-…
\\                                              SysUpdater_k2j8
\\Microsoft\\Windows\\Defrag\\                    ScheduledDefrag
\\Microsoft\\Windows\\WindowsUpdate\\             Scheduled Start`,
    mistakes: ['Deleting tasks before reviewing what they run. Inspect the action first.'],
    requirements: 'Windows 8 or Windows Server 2012 and later. ScheduledTasks module.',
    recallPrompt: 'List scheduled tasks in the Ready state with their path and name.',
    accepted: ["Get-ScheduledTask | Where-Object { $_.State -eq 'Ready' } | Select-Object TaskPath, TaskName", 'Get-ScheduledTask | Where-Object State -eq Ready | Select-Object TaskPath, TaskName'],
    related: ['ps.scheduledtask-action', 'ps.run-keys'],
    keywords: ['scheduled tasks', 'persistence', 'task scheduler'],
    source: ps('ScheduledTasks', 'Get-ScheduledTask'),
  },
  {
    id: 'ps.scheduledtask-action',
    command: "(Get-ScheduledTask -TaskName 'SysUpdater_k2j8').Actions | Select-Object Execute, Arguments",
    title: 'See what a scheduled task runs',
    category: 'security',
    subcategory: 'Incident triage',
    difficulty: 'advanced',
    objective: 'Read the program and arguments a scheduled task launches.',
    summary: 'Shows the executable and arguments of the SysUpdater_k2j8 task.',
    whenToUse: 'When a task looks unfamiliar and you need to know what it does.',
    syntax: [
      { token: "(Get-ScheduledTask -TaskName 'SysUpdater_k2j8')", meaning: 'one task object' },
      { token: '.Actions', meaning: 'what it runs' },
      { token: 'Select-Object Execute, Arguments', meaning: 'program and arguments' },
    ],
    sampleOutput: `Execute                                        Arguments
-------                                        ---------
powershell.exe                                 -w hidden -enc SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoA…`,
    mistakes: ['Running the encoded command to see what it does. Decode it as text instead, in an isolated lab.'],
    requirements: 'Windows 8 or Windows Server 2012 and later.',
    recallPrompt: 'Show the program and arguments run by the scheduled task SysUpdater_k2j8.',
    accepted: ['(Get-ScheduledTask -TaskName SysUpdater_k2j8).Actions | Select-Object Execute, Arguments', '(Get-ScheduledTask SysUpdater_k2j8).Actions | Select-Object Execute, Arguments'],
    related: ['ps.get-scheduledtask'],
    keywords: ['task action', 'encoded command'],
    source: ps('ScheduledTasks', 'Get-ScheduledTask'),
  },
  {
    id: 'ps.run-keys',
    command: "Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run'",
    title: 'Inspect Run registry keys',
    category: 'security',
    subcategory: 'Configuration inspection',
    difficulty: 'advanced',
    objective: 'List programs configured to start at sign-in for all users.',
    summary: 'Reads the machine-wide Run key, where programs register to start automatically at user sign-in.',
    details: 'Check HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run for the current user as well. Reading is safe. Do not edit the registry outside a lab.',
    whenToUse: 'When looking for unwanted programs that start at sign-in.',
    syntax: [
      { token: 'Get-ItemProperty', meaning: 'read registry values' },
      { token: "'HKLM:\\SOFTWARE\\...\\Run'", meaning: 'the machine-wide Run key, quoted' },
    ],
    sampleOutput: `SecurityHealth : C:\\Windows\\system32\\SecurityHealthSystray.exe
RtkAudUService : "C:\\Windows\\System32\\DriverStore\\FileRepository\\realtekservice.inf_amd64\\RtkAudUService64.exe" -background
WinUpd         : C:\\Users\\Public\\winupd.exe /silent
PSPath         : Microsoft.PowerShell.Core\\Registry::HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run`,
    mistakes: ['Forgetting to also check the per-user HKCU Run key.'],
    requirements: 'Windows.',
    recallPrompt: 'Read the machine-wide Run registry key.',
    accepted: ['Get-ItemProperty -Path HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run', 'Get-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run'],
    related: ['ps.get-scheduledtask', 'ps.cim-autostart-services'],
    keywords: ['startup programs', 'run key', 'autoruns', 'persistence'],
    source: ps('Microsoft.PowerShell.Management', 'Get-ItemProperty'),
  },
  {
    id: 'ps.cim-startup',
    command: 'Get-CimInstance Win32_StartupCommand | Select-Object Name, Command, Location, User',
    title: 'List startup commands',
    category: 'security',
    subcategory: 'Defensive system auditing',
    difficulty: 'advanced',
    objective: 'Collect startup entries from several locations in one query.',
    summary: 'Lists startup commands from Run keys and Startup folders, with their location and user.',
    whenToUse: 'As a quick persistence overview during triage.',
    syntax: [
      { token: 'Win32_StartupCommand', meaning: 'WMI class combining common startup locations' },
      { token: 'Select-Object Name, Command, Location, User', meaning: 'fields to review' },
    ],
    sampleOutput: `Name           Command                                      Location                                         User
----           -------                                      --------                                         ----
SecurityHealth C:\\Windows\\system32\\SecurityHealthSystray.exe HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run Public
WinUpd         C:\\Users\\Public\\winupd.exe /silent           HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run Public
OneDrive       "C:\\Program Files\\Microsoft OneDrive\\OneDrive.exe" /background HKU\\S-1-5-21-…\\Run          LAB\\jsmith`,
    mistakes: ['Assuming this class covers every persistence method. It does not include services or scheduled tasks.'],
    requirements: 'Windows.',
    recallPrompt: 'List startup commands with their location and user using CIM.',
    related: ['ps.run-keys', 'ps.get-scheduledtask'],
    keywords: ['startup', 'autoruns'],
    source: ps('CimCmdlets', 'Get-CimInstance'),
  },
])
